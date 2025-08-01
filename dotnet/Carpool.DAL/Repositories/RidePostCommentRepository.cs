using Carpool.DAL.Interfaces;
using Carpool.Entities;
using GameStore.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories;

public class PostCommentRepository(ApplicationDbContext context) : IRidePostCommentRepository
{
    private readonly ApplicationDbContext _context = context;
    public async Task<IEnumerable<RidePostComment>> GetAllAsync()
    {
        return await _context.RidePostComments.AsNoTracking().ToListAsync();
    }

    public async Task<RidePostComment> GetByIdAsync(int id)
    {
        var ridePostComment = await _context.RidePostComments
            .AsNoTracking().FirstOrDefaultAsync(p => p.Id == id)
                ?? throw new NotFoundException($"Post comment with id {id} not found");

        return ridePostComment;
    }

    public async Task<IEnumerable<RidePostComment>> GetByPostIdAsync(int ridePostId)
    {
        return await _context.RidePostComments
            .AsNoTracking().Where(p => p.RidePostId == ridePostId).ToListAsync();
    }

    public async Task<RidePostComment> AddAsync(RidePostComment ridePostComment)
    {
        await _context.RidePostComments.AddAsync(ridePostComment);
        await _context.SaveChangesAsync();

        return ridePostComment;
    }

    public async Task<RidePostComment> UpdateAsync(RidePostComment ridePostComment)
    {
        var existingPostComment = await _context.RidePostComments.FindAsync(ridePostComment.Id)
            ?? throw new NotFoundException($"Comment with id {ridePostComment.Id} not found");

        _context.Entry(existingPostComment).CurrentValues.SetValues(ridePostComment);
        await _context.SaveChangesAsync();

        return existingPostComment;
    }

    public async Task DeleteAsync(int id)
    {
        var ridePostComment = await _context.RidePostComments.FindAsync(id)
            ?? throw new NotFoundException($"Post comment with id {id} not found");

        _context.RidePostComments.Remove(ridePostComment);
        await _context.SaveChangesAsync();
    }
}
