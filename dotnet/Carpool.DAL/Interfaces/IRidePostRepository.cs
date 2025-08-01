using Carpool.Entities;

namespace Carpool.DAL.Interfaces;

public interface IRidePostRepository
{
    IQueryable<RidePost> GetAllAsQueryable();

    Task<RidePost> GetByIdAsync(int id);

    Task<IEnumerable<RidePost>> GetByUserIdAsync(string userId);

    Task<RidePost> AddAsync(RidePost ridePost);

    Task<RidePost> UpdateAsync(RidePost ridePost);

    Task DeleteAsync(int id);
}
