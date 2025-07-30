using Carpool.Entities;

namespace Carpool.DAL.Interfaces;

public interface IPostRepository
{
    IQueryable<Post> GetAllAsQueryable();

    Task<Post> GetByIdAsync(int id);

    Task<IEnumerable<Post>> GetByUserIdAsync(string userId);

    Task<Post> AddAsync(Post post);

    Task<Post> UpdateAsync(Post post);

    Task DeleteAsync(int id);
}
