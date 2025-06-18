
using Carpool.Entities;

namespace Carpool.DAL.Interfaces;

public interface ICountryRepository
{
    Task<IEnumerable<Country>> GetAllAsTrackingAsync();

    Task<Country> EnsureTrackedAsync(string name);
}
