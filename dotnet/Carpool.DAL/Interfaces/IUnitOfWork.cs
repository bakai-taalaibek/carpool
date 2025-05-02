namespace Carpool.DAL.Interfaces;

public interface IUnitOfWork
{
    IPostRepository Posts { get; }
    IPostCommentRepository PostComments { get; }
    IReviewRepository Reviews { get; }
    ILocalityRepository Localities { get; }

    Task SaveAsyncAsync();
}
