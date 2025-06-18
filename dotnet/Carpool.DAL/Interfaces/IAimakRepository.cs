using Carpool.Entities;

namespace Carpool.DAL.Interfaces;

public interface IAimakRepository
{
    Task<IEnumerable<Aimak>> GetAllAsTrackingAsync();

    Task<Aimak> EnsureTrackedAsync(string name, District district);
}
