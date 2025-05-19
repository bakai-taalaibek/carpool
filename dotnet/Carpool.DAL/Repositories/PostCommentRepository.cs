using Carpool.DAL.Interfaces;
using Carpool.Entities;
using GameStore.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories;

public class PostCommentRepository(ApplicationDbContext context) : IPostCommentRepository
{
    private readonly ApplicationDbContext _context = context;
    public async Task<IEnumerable<PostComment>> GetAllAsync()
    {
        return await _context.PostComments.AsNoTracking().ToListAsync();
    }

    public async Task<PostComment> GetByIdAsync(int id)
    {
        var postComment = await _context.PostComments.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new NotFoundException($"Post comment with id {id} not found");

        return postComment;
    }

    public async Task<IEnumerable<PostComment>> GetByPostIdAsync(int postId)
    {
        return await _context.PostComments.AsNoTracking().Where(p => p.PostId == postId).ToListAsync();
    }

    public async Task<PostComment> AddAsync(PostComment postComment)
    {
        await _context.PostComments.AddAsync(postComment);
        await _context.SaveChangesAsync();

        return postComment;
    }

    public async Task<PostComment> UpdateAsync(PostComment postComment)
    {
        var existingPostComment = await _context.PostComments.FindAsync(postComment.Id)
            ?? throw new NotFoundException($"Post comment with id {postComment.Id} not found");

        _context.Entry(existingPostComment).CurrentValues.SetValues(postComment);
        await _context.SaveChangesAsync();

        return existingPostComment;
    }

    public async Task DeleteAsync(int id)
    {
        var postComment = await _context.PostComments.FindAsync(id)
            ?? throw new NotFoundException($"Post comment with id {id} not found");

        _context.PostComments.Remove(postComment);
        await _context.SaveChangesAsync();
    }
}
