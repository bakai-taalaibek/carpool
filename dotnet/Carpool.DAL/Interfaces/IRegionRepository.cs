using Carpool.Entities;

namespace Carpool.DAL.Interfaces;

public interface IRegionRepository
{
    Task<IEnumerable<Region>> GetAllAsTrackingAsync();

    Task<Region> EnsureTrackedAsync(string name, Country country);
}
