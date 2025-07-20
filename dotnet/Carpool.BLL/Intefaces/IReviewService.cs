using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Intefaces;

public interface IReviewService
{
    Task<IEnumerable<ReviewFullDto>> GetAllAsync();

    Task<ReviewFullDto> GetByIdAsync(int id);

    Task<IEnumerable<ReviewFullDto>> GetByUserIdAsync(string userId);

    Task<ReviewFullDto> AddAsync(ReviewFullDto review);
}
