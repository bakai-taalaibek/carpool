using Carpool.Entities;

namespace Carpool.DAL.Interfaces;

public interface IRideRoleRepository
{
    Task<IEnumerable<RideRole>> GetAllAsync();

    Task<RideRole> GetByIdAsync(int id);
}
