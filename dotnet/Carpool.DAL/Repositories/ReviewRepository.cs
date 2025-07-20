using Carpool.DAL.Interfaces;
using Carpool.Entities;
using GameStore.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories;

public class ReviewRepository(ApplicationDbContext context) : IReviewRepository
{
    private readonly ApplicationDbContext _context = context;

  public async Task<IEnumerable<Review>> GetAllAsync()
    {
        return await _context.Reviews.AsNoTracking().ToListAsync();
    }

    public async Task<Review> GetByIdAsync(int id)
    {
        var review = await _context.Reviews
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == id);

        return review ?? throw new NotFoundException($"Review with id {id} not found");
    }

    public async Task<IEnumerable<Review>> GetByUserIdAsync(string userId)
    {
        var reviews = await _context.Reviews
            .AsNoTracking()
            .Where(r => r.UserId == userId)
            .ToListAsync();        

        return reviews ?? throw new NotFoundException($"Reviews by user id {userId} not found");
    }

    public async Task<Review> AddAsync(Review review)
    {
        await _context.Reviews.AddAsync(review);
        var result = await _context.SaveChangesAsync();

        return result == 0 ? throw new NotCreatedException(typeof(Review)) : review;
    }
}
