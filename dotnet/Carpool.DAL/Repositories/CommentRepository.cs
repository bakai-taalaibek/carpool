using System.Threading.Tasks;
using Carpool.DAL.Entities;
using Carpool.DAL.Interfaces;
using GameStore.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories;

public class CommentRepository(ApplicationDbContext context) : ICommentRepository
{
    private readonly ApplicationDbContext _context = context;

    public async Task<IEnumerable<Comment>> GetAllAsync()
    {
        return await _context.Comments.AsNoTracking().ToListAsync();
    }

    public async Task<Comment> GetByIdAsync(int id)
    {
        var comment = await _context.Comments
            .AsNoTracking().FirstOrDefaultAsync(i => i.Id == id)
                ?? throw new NotFoundException($"Comment with id {id} not found");

        return comment;
    }

    public async Task<IEnumerable<Comment>> GetByRidePostIdAsync(int ridePostId)
    {
        return await _context.Comments
            .AsNoTracking()
            .Where(i => i.RidePostId == ridePostId)
            .Include(i => i.User)
            .Include(i => i.Guest)
            .ToListAsync();
    }

    public async Task<Comment> AddAsync(Comment comment)
    {
        await _context.Comments.AddAsync(comment);
        await _context.SaveChangesAsync();

        return comment;
    }

    public async Task<Comment> UpdateAsync(Comment comment)
    {
        var existingComment = await _context.Comments.FindAsync(comment.Id)
            ?? throw new NotFoundException($"Comment with id {comment.Id} not found");

        _context.Entry(existingComment).CurrentValues.SetValues(comment);
        await _context.SaveChangesAsync();

        return existingComment;
    }
}
