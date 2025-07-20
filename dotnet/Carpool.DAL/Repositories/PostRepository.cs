using Carpool.DAL.Interfaces;
using Carpool.Entities;
using GameStore.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories;

public class PostRepository(ApplicationDbContext context) : IPostRepository
{
    private readonly ApplicationDbContext _context = context;
    public async Task<IEnumerable<Post>> GetAllAsync()
    {
        return await _context.Posts.AsNoTracking().ToListAsync();
    }

    public async Task<Post> GetByIdAsync(int id)
    {
        var post = await _context.Posts.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new NotFoundException($"Post with id {id} not found");

        return post;
    }

    public async Task<IEnumerable<Post>> GetByUserIdAsync(string userId)
    {
        return await _context.Posts.AsNoTracking().Where(p => p.UserId == userId).ToListAsync();
    }

    public async Task<Post> AddAsync(Post post)
    {
        await _context.Posts.AddAsync(post);
        await _context.SaveChangesAsync();

        return post;
    }

    public async Task<Post> UpdateAsync(Post post)
    {
        var existingPost = await _context.Posts.FindAsync(post.Id)
            ?? throw new NotFoundException($"Post with id {post.Id} not found");

        _context.Entry(existingPost).CurrentValues.SetValues(post);
        await _context.SaveChangesAsync();

        return existingPost;
    }

    public async Task DeleteAsync(int id)
    {
        var post = await _context.Posts.FindAsync(id)
            ?? throw new NotFoundException($"Post with id {id} not found");

        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();
    }
}
