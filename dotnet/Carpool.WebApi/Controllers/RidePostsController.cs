using System.Security.Claims;
using Carpool.BLL.Intefaces;
using Carpool.Contracts.DTOs;
using Carpool.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RidePostsController(
    IRidePostService ridePostService,
    IGuestService guestService) : ControllerBase
{
    private readonly IRidePostService _ridePostService = ridePostService;

    private readonly IGuestService _guestService = guestService;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] RidePostQueryParameters parameters)
    {
        string? userId = User.Identity?.IsAuthenticated == true
            ? User.FindFirstValue(ClaimTypes.NameIdentifier)
            : null;

        if (!Guid.TryParse(Request.Headers["X-Guest-Id"].FirstOrDefault(), out var guestId))
        {
            return BadRequest("Invalid Guest ID format");
        }

        var ridePosts = await _ridePostService.GetAsync(parameters, userId, guestId);
        return Ok(ridePosts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var ridePost = await _ridePostService.GetByIdAsync(id);
        return Ok(ridePost);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetByUserId(string userId)
    {
        var ridePosts = await _ridePostService.GetByUserIdAsync(userId);
        return Ok(ridePosts);
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] RidePostCreateDto ridePost)
    {
        (var userId, var guestId) = ExtractUserIdAndGuestId();

        await _guestService.EnsureGuestExistsIfAnonymousAsync(userId, guestId);

        var newRidePost = await _ridePostService.AddAsync(ridePost, userId, guestId);
        return CreatedAtAction(nameof(GetById), new { id = newRidePost.Id }, newRidePost);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] RidePostFullDto ridePost)
    {
        var updatedRidePost = await _ridePostService.UpdateAsync(ridePost);
        return Ok(updatedRidePost);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _ridePostService.DeleteAsync(id);
        return NoContent();
    }

    private (string? userId, Guid? guestId) ExtractUserIdAndGuestId()
    {
        string? userId = User.Identity?.IsAuthenticated == true
            ? User.FindFirstValue(ClaimTypes.NameIdentifier)
            : null;

        var guestIdRaw = Request.Headers["X-Guest-Id"].FirstOrDefault();

        Guid? guestId = null;
        if (!string.IsNullOrWhiteSpace(guestIdRaw))
        {
            if (!Guid.TryParse(guestIdRaw, out var parsedGuestId))
            {
                throw new BadHttpRequestException("Invalid Guest ID format");
            }

            guestId = parsedGuestId;
        }

        return (userId, guestId);
    }
}
