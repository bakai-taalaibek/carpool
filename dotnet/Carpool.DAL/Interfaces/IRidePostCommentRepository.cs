using Carpool.Entities;

namespace Carpool.DAL.Interfaces;

public interface IRidePostCommentRepository
{
    Task<IEnumerable<RidePostComment>> GetAllAsync();

    Task<RidePostComment> GetByIdAsync(int id);

    Task<IEnumerable<RidePostComment>> GetByPostIdAsync(int ridePostId);

    Task<RidePostComment> AddAsync(RidePostComment ridePostComment);

    Task<RidePostComment> UpdateAsync(RidePostComment ridePostComment);

    Task DeleteAsync(int id);
}
