using Carpool.Entities;

namespace Carpool.DAL.Interfaces;

public interface IPostRepository
{
    Task<IEnumerable<Post>> GetAllAsync();

    Task<Post> GetByIdAsync(int id);

    Task<IEnumerable<Post>> GetByUserIdAsync(int userId);

    Task<Post> AddAsync(Post post);

    Task<Post> UpdateAsync(Post post);

    Task DeleteAsync(int id);
}
