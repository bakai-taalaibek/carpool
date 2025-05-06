using Carpool.BLL.Intefaces;
using Carpool.BLL.Mappers;
using Carpool.Contracts.DTOs;
using Carpool.DAL.Interfaces;
using Carpool.Entities;

namespace Carpool.BLL.Services;

public class ReviewService(IUnitOfWork unitOfWork) : IReviewService
{
    private IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<IEnumerable<ReviewFullDto>> GetAllAsync()
    {
        var reviews = await _unitOfWork.Reviews.GetAllAsync();
        
        return reviews.Select(r => r.ToFullDto());
    }

    public async Task<ReviewFullDto> GetByIdAsync(int id)
    {
        var review = await _unitOfWork.Reviews.GetByIdAsync(id);

        return review.ToFullDto();
    }

    public async Task<IEnumerable<ReviewFullDto>> GetByUserIdAsync(int userId)
    {
        var reviews = await _unitOfWork.Reviews.GetByUserIdAsync(userId);
        
        return reviews.Select(r => r.ToFullDto());
    }

    public async Task<ReviewFullDto> AddAsync(Review review)
    {
        var createdReview = await _unitOfWork.Reviews.AddAsync(review);
        
        return createdReview.ToFullDto();
    }
}
