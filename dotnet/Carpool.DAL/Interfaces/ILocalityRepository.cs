using Carpool.Entities;

namespace Carpool.DAL.Interfaces;

public interface ILocalityRepository
{
    Task<IEnumerable<Locality>> GetAllAsync();

    Task<Locality> GetByIdAsync(int id);

    Task<IEnumerable<Locality>> GetByNameAsync(string name);
}
