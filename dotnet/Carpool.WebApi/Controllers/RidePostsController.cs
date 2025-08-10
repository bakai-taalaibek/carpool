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
    IUserContextService userContextService,
    IGuestService guestService) : ControllerBase
{
    private readonly IRidePostService _ridePostService = ridePostService;
    private readonly IUserContextService _userContextService = userContextService;
    private readonly IGuestService _guestService = guestService;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] RidePostQueryParameters parameters)
    {
        (var userId, var guestId) = _userContextService.GetUserIdAndGuestId();

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
        (var userId, var guestId) = _userContextService.GetUserIdAndGuestId();

        await _guestService.EnsureGuestExistsIfAnonymousAsync(userId, guestId);

        var newRidePost = await _ridePostService.AddAsync(ridePost, userId, guestId);
        return CreatedAtAction(nameof(Add), new { id = newRidePost.Id }, newRidePost);
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
}
