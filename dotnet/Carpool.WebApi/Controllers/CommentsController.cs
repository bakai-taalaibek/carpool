using Carpool.BLL.Intefaces;
using Carpool.BLL.Services;
using Carpool.Contracts.DTOs;
using Carpool.DAL;
using Carpool.DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CommentsController(
    IGuestService guestService,
    IUserContextService userContextService,
    ICommentService commentService) : ControllerBase
{
    private readonly ICommentService _commentService = commentService;
    private readonly IUserContextService _userContextService = userContextService;
    private readonly IGuestService _guestService = guestService;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var comments = await _commentService.GetAllAsync();
        return Ok(comments);
    }

    [HttpGet("post/{ridePostId}")]
    public async Task<IActionResult> GetByRidePostId(int ridePostId)
    {
        var comments = await _commentService.GetByRidePostIdAsync(ridePostId);
        return Ok(comments);
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CommentCreateDto comment)
    {
        (var userId, var guestId) = _userContextService.GetUserIdAndGuestId();

        await _guestService.EnsureGuestExistsIfAnonymousAsync(userId, guestId);

        var newComment = await _commentService.AddAsync(comment, userId, guestId);
        return CreatedAtAction(nameof(Add), new { id = newComment.Id }, newComment);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] CommentFullDto comment)
    {
        var updatedComment = await _commentService.UpdateAsync(comment);
        return Ok(updatedComment);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _commentService.DeleteAsync(id);
        return NoContent();
    }
}
