using Carpool.DAL.Interfaces;
using Carpool.Entities;
using GameStore.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories;

public class RidePostRepository(ApplicationDbContext context) : IRidePostRepository
{
    private readonly ApplicationDbContext _context = context;
    public IQueryable<RidePost> GetAllAsQueryable()
    {
        return _context.RidePosts.AsNoTracking().AsQueryable();
    }

    public async Task<RidePost> GetByIdAsync(int id)
    {
        var ridePost = await _context.RidePosts
            .AsNoTracking().FirstOrDefaultAsync(p => p.Id == id)
                ?? throw new NotFoundException($"Post with id {id} not found");

        return ridePost;
    }

    public async Task<IEnumerable<RidePost>> GetByUserIdAsync(string userId)
    {
        return await _context.RidePosts.AsNoTracking().Where(p => p.UserId == userId).ToListAsync();
    }

    public async Task<RidePost> AddAsync(RidePost ridePost)
    {
        await _context.RidePosts.AddAsync(ridePost);
        await _context.SaveChangesAsync();

        return ridePost;
    }

    public async Task<RidePost> UpdateAsync(RidePost ridePost)
    {
        var existingPost = await _context.RidePosts.FindAsync(ridePost.Id)
            ?? throw new NotFoundException($"Post with id {ridePost.Id} not found");

        _context.Entry(existingPost).CurrentValues.SetValues(ridePost);
        await _context.SaveChangesAsync();

        return existingPost;
    }

    public async Task DeleteAsync(int id)
    {
        var ridePost = await _context.RidePosts.FindAsync(id)
            ?? throw new NotFoundException($"Post with id {id} not found");

        _context.RidePosts.Remove(ridePost);
        await _context.SaveChangesAsync();
    }
}
