using Carpool.Entities;

namespace Carpool.DAL.Interfaces;

public interface IReviewRepository
{
    Task<IEnumerable<Review>> GetAllAsync();

    Task<Review> GetByIdAsync(int id);

    Task<IEnumerable<Review>> GetByUserIdAsync(int userId);

    Task<Review> AddAsync(Review review);
}
