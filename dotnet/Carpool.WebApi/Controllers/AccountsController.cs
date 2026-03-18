using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Carpool.Contracts.DTOs;
using Carpool.DAL;
using Carpool.DAL.Entities;
using FirebaseAdmin.Auth;
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
    SignInManager<ApplicationUser> signInManager,
    EmailService emailService,
    IConfiguration config) : ControllerBase
{
    private readonly ApplicationDbContext _context = applicationDbContext;
    private readonly ILogger<AccountsController> _logger = logger;
    private readonly IConfiguration _configuration = configuration;
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly SignInManager<ApplicationUser> _signInManager = signInManager;
    private readonly IConfiguration _config = config;
    private readonly EmailService _emailService = emailService;

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] RegisterRequestDto input)
    {
        var newUser = new ApplicationUser
        {
            UserName = input.Email ?? input.PhoneNumber,
            Email = input.Email,
            PhoneNumber = input.PhoneNumber
        };

        var result = await _userManager.CreateAsync(newUser, input.Password);
        if (result.Succeeded)
        {
            _logger.LogInformation(
                "User {userName} ({email}) has been created.",
                newUser.UserName, newUser.Email);

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
            var link = $"{_config["FrontendUrl"]}/auth/verify-email?" +
                        $"userId={newUser.Id}&token={Uri.EscapeDataString(token)}";

            await _emailService.SendVerificationEmail(newUser.Email, link);

            return Created("", new RegisterResponseDto
            {
                Message = $"User '{newUser.UserName}' has been created."
            });
        }
        else
        {
            return BadRequest(new
            {
                Errors = result.Errors.Select(e =>
                    new { code = e.Code, message = e.Description })
            });
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
            if (!string.IsNullOrWhiteSpace(user.Email) && !user.EmailConfirmed)
            {
                return StatusCode(403, new
                {
                    error = "EMAIL_NOT_VERIFIED",
                    message = "Email has not been verified"
                });
            }

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();

            JwtSecurityToken jwtObject = MakeJwtObject(user, role);
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

    [HttpPost("request-email-verification")]
    public async Task<IActionResult> ResendEmailVerification(RequestEmailVerificationDto request)
    {
        var user = request.UserId != null ? await _userManager.FindByIdAsync(request.UserId) :
        request.Email != null ? await _userManager.FindByEmailAsync(request.Email) : null;

        if (user == null)
            return Ok();

        if (user.EmailConfirmed)
        {
            return Ok();
        }

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        var link = $"{_config["FrontendUrl"]}/auth/verify-email?" +
                    $"userId={user.Id}&token={Uri.EscapeDataString(token)}";

        await _emailService.SendVerificationEmail(user.Email, link);

        return Ok();
    }

    [HttpPost("verify-email")]
    public async Task<IActionResult> VerifyEmail(VerificationRequestDto request)
    {
        var user = await _userManager.FindByIdAsync(request.UserId);

        if (user == null)
            return BadRequest();

        var result = await _userManager.ConfirmEmailAsync(user, request.Token);

        if (!result.Succeeded)
            return BadRequest();

        return Ok(new { message = "Email verified" });
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordRequestDto request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user == null)
            return Ok();

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        var link = $"{_config["FrontendUrl"]}/auth/reset-password?" +
                    $"userEmail={user.Email}&token={Uri.EscapeDataString(token)}";

        await _emailService.SendPasswordResetToken(user.Email, link);

        return Ok();
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequestDto request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user == null)
            return BadRequest();

        var result = await _userManager.ResetPasswordAsync(
            user,
            request.Token,
            request.Password
        );

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok(new { message = "Password reset successful" });
    }

    [HttpPost("auth")]
    public async Task<ActionResult> Auth()
    {
        var authHeader = Request.Headers["Authorization"]
            .FirstOrDefault();

        if (authHeader == null || !authHeader.StartsWith("Bearer "))
            return Unauthorized();

        var token = authHeader.Substring("Bearer ".Length);

        FirebaseToken decodedToken;
        try
        {
            decodedToken = await FirebaseAuth
                .DefaultInstance
                .VerifyIdTokenAsync(token);
        }
        catch
        {
            return Unauthorized();
        }

        var uid = decodedToken.Uid;
        var email = decodedToken.Claims.ContainsKey("email")
            ? decodedToken.Claims["email"]?.ToString()
            : null;
        var phoneNumber = decodedToken.Claims.ContainsKey("phone_number")
            ? decodedToken.Claims["phone_number"]?.ToString()
            : null;

        // Find or create user in your DB here
        ApplicationUser? user = await _userManager.Users
            .FirstOrDefaultAsync(u => u.FirebaseUid == uid);

        if (user == null)
        {
            if (email != null && new EmailAddressAttribute().IsValid(email))
            {
                var emailVerified =
                    decodedToken.Claims.ContainsKey("email_verified") &&
                    (bool)decodedToken.Claims["email_verified"];

                if (emailVerified)
                {
                    user = await _userManager.FindByEmailAsync(email);

                    if (user != null)
                    {
                        user.FirebaseUid = uid;
                        await _userManager.UpdateAsync(user);
                    }
                }
            }

            if (user == null && !string.IsNullOrEmpty(phoneNumber))
            {
                user = await _userManager.Users
                    .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);

                if (user != null)
                {
                    user.FirebaseUid = uid;
                    await _userManager.UpdateAsync(user);
                }
            }

            if (user == null)
            {
                user = new ApplicationUser
                {
                    UserName = email ?? phoneNumber ?? uid,
                    Email = email,
                    PhoneNumber = phoneNumber,
                    FirebaseUid = uid
                };

                var result = await _userManager.CreateAsync(user);

                if (!result.Succeeded)
                {
                    return BadRequest(new { Errors = result.Errors.Select(e => e.Description) });
                }

                _logger.LogInformation("User {userName} created via Firebase.", user.UserName);
            }
        }
        var roles = await _userManager.GetRolesAsync(user);
        var role = roles.FirstOrDefault();

        JwtSecurityToken jwtObject = MakeJwtObject(user, role);

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
                DateCreated = user.DateCreated,
            }
        });
    }

    private JwtSecurityToken MakeJwtObject(ApplicationUser user, string? role)
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

        if (!string.IsNullOrEmpty(role))
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var expirySeconds = int.Parse(_configuration["JWT:ExpirySeconds"] ?? "3600");
        return new JwtSecurityToken(
            issuer: _configuration["JWT:Issuer"],
            audience: _configuration["JWT:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddSeconds(expirySeconds),
            signingCredentials: signingCredentials);
    }
}
