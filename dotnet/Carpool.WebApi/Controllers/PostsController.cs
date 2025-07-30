using System.Security.Claims;
using Carpool.BLL.Intefaces;
using Carpool.Contracts.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PostsController(IPostService postService) : ControllerBase
{
    private readonly IPostService _postService = postService;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] PostQueryParameters parameters)
    {
        string? userId = User.Identity?.IsAuthenticated == true
            ? User.FindFirstValue(ClaimTypes.NameIdentifier)
            : null;

        if (!Guid.TryParse(Request.Headers["X-Guest-Id"].FirstOrDefault(), out var guestId))
        {
            return BadRequest("Invalid Guest ID format");
        }

        var posts = await _postService.GetAsync(parameters, userId, guestId);
        return Ok(posts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var post = await _postService.GetByIdAsync(id);
        return Ok(post);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetByUserId(string userId)
    {
        var posts = await _postService.GetByUserIdAsync(userId);
        return Ok(posts);
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] PostFullDto post)
    {
        var newPost = await _postService.AddAsync(post);
        return CreatedAtAction(nameof(GetById), new { id = newPost.Id }, newPost);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] PostFullDto post)
    {
        var updatedPost = await _postService.UpdateAsync(post);
        return Ok(updatedPost);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _postService.DeleteAsync(id);
        return NoContent();
    }
}
