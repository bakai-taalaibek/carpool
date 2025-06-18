using Carpool.Entities;

namespace Carpool.DAL.Interfaces;

public interface IDistrictRepository
{
    Task<IEnumerable<District>> GetAllAsTrackingAsync();

    Task<District> EnsureTrackedAsync(string name, Region region);
}
