using Carpool.DAL.Entities;

namespace Carpool.DAL.Interfaces;

public interface ICommentRepository
{
    Task<IEnumerable<Comment>> GetAllAsync();

    Task<Comment> GetByIdAsync(int id);

    Task<IEnumerable<Comment>> GetByRidePostIdAsync(int ridePostId);

    Task<Comment> AddAsync(Comment comment);

    Task<Comment> UpdateAsync(Comment comment);
}
