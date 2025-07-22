using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Carpool.Contracts.DTOs;
using Carpool.DAL;
using Carpool.DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Carpool.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountsController(
    ApplicationDbContext applicationDbContext,
    ILogger<AccountsController> logger,
    IConfiguration configuration,
    UserManager<ApplicationUser> userManager,
    SignInManager<ApplicationUser> signInManager) : ControllerBase
{
    private readonly ApplicationDbContext _context = applicationDbContext;
    private readonly ILogger<AccountsController> _logger = logger;
    private readonly IConfiguration _configuration = configuration;
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly SignInManager<ApplicationUser> _signInManager = signInManager;

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] RegisterRequestDto input)
    {
        var newUser = new ApplicationUser();
        newUser.UserName = input.Email ?? input.PhoneNumber;
        newUser.Email = input.Email;
        newUser.PhoneNumber = input.PhoneNumber;

        var result = await _userManager.CreateAsync(newUser, input.Password);
        if (result.Succeeded)
        {
            _logger.LogInformation(
                "User {userName} ({email}) has been created.",
                newUser.UserName, newUser.Email);

            return Created("", new RegisterResponseDto
            {
                Message = $"User '{newUser.UserName}' has been created."
            });
        }
        else
        {
            return BadRequest(new { Errors = result.Errors.Select(e => e.Description) });
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginRequestDto input)
    {
        var identifier = input.Identifier.Trim();
        ApplicationUser? user = new EmailAddressAttribute().IsValid(identifier)
            ? await _userManager.FindByEmailAsync(identifier)
            : await _userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == identifier);

        if (user == null)
        {
            return Unauthorized("Invalid login attempt.");
        }

        var result = await _signInManager.PasswordSignInAsync(
            user,
            input.Password,
            false,
            lockoutOnFailure: false);
        if (!result.Succeeded)
        {
            return Unauthorized("Invalid login attempt.");
        }
        else
        {
            var signingKey = _configuration["JWT:SigningKey"]
                ?? throw new InvalidOperationException("JWT SigningKey is missing in configuration.");

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(
                    System.Text.Encoding.UTF8.GetBytes(signingKey)),
                    SecurityAlgorithms.HmacSha256);

            var userName = user.UserName
                ?? throw new InvalidOperationException("UserName cannot be null.");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.Email, user.Email ?? ""),
                new Claim(ClaimTypes.MobilePhone, user.PhoneNumber ?? ""),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
            };

            var role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
            if (!string.IsNullOrEmpty(role))
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var expirySeconds = int.Parse(_configuration["JWT:ExpirySeconds"] ?? "3600");
            var jwtObject = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddSeconds(expirySeconds),
                signingCredentials: signingCredentials);

            var jwtString = new JwtSecurityTokenHandler().WriteToken(jwtObject);

            return Ok(new LoginResponseDto
            {
                Token = jwtString,
                ExpiresAt = jwtObject.ValidTo,
                User = new UserFullDto
                {
                    Id = user.Id,
                    Role = role,
                    DisplayName = user.DisplayName,
                    PhoneNumber = user.PhoneNumber,
                    Email = user.Email,
                    Car = user.Car,
                    About = user.About,
                    Avatar = user.Avatar,
                    DateCreated = user.DateCreated
                }
            });
        }
    }
}
