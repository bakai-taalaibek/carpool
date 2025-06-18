using System;
using Carpool.Entities;

namespace Carpool.DAL.Interfaces;

public interface ILocalityTypeRepository
{
    Task<IEnumerable<LocalityType>> GetAllAsTrackingAsync();

    Task<LocalityType> EnsureTrackedAsync(string name);
}
