using Carpool.DAL.Interfaces;

namespace Carpool.DAL.Repositories;

public class UnitOfWork(
    ApplicationDbContext _context, 
    IPostRepository postRepository, 
    IPostCommentRepository postCommentRepository, 
    IReviewRepository reviewRepository, 
    ILocalityRepository localityRepository) : IUnitOfWork
{
    public IPostRepository Posts { get; } = postRepository;

    public IPostCommentRepository PostComments { get; } = postCommentRepository;

    public IReviewRepository Reviews { get; } = reviewRepository;

    public ILocalityRepository Localities { get; } = localityRepository;

    public Task SaveAsyncAsync()
    {
        return _context.SaveChangesAsync();
    }
}
