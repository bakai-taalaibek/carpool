using Carpool.Entities;

namespace Carpool.DAL.Interfaces;

public interface IPostCommentRepository
{
    Task<IEnumerable<PostComment>> GetAllAsync();

    Task<PostComment> GetByIdAsync(int id);

    Task<IEnumerable<PostComment>> GetByPostIdAsync(int postId);

    Task<PostComment> AddAsync(PostComment postComment);

    Task<PostComment> UpdateAsync(PostComment postComment);

    Task DeleteAsync(int id);
}
