using Carpool.BLL.Intefaces;
using Carpool.Contracts.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ReviewsController : ControllerBase
{
    private readonly IReviewService _reviewService;

    public ReviewsController(IReviewService reviewService)
    {
        _reviewService = reviewService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var reviews = await _reviewService.GetAllAsync();
        return Ok(reviews);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var review = await _reviewService.GetByIdAsync(id);
        return Ok(review);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetByUserId(int userId)
    {
        var reviews = await _reviewService.GetByUserIdAsync(userId);
        return Ok(reviews);
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] ReviewFullDto review)
    {
        var createdReview = await _reviewService.AddAsync(review);
        return CreatedAtAction(nameof(GetById), new { id = createdReview.Id }, createdReview);
    }
}
