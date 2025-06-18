using Carpool.Entities;

namespace Carpool.DAL.Interfaces;

public interface ILocalityRepository
{
    Task<IEnumerable<Locality>> GetAllAsTrackingAsync();

    Task<IEnumerable<Locality>> GetAllAsync();

    Task<Locality> GetByIdAsync(int id);

    Task<IEnumerable<Locality>> GetByNameAsync(string name);

    Task<Locality> EnsureTrackedAsync(Locality locality);
}
