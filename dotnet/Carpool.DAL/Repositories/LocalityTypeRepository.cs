using Carpool.DAL.Interfaces;
using Carpool.Entities;
using GameStore.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories;

public class LocalityTypeRepository(ApplicationDbContext context) : ILocalityTypeRepository
{
    private readonly ApplicationDbContext _context = context;

    public async Task<IEnumerable<LocalityType>> GetAllAsTrackingAsync()
    {
        return await _context.LocalityTypes.ToListAsync();
    }

    public async Task<LocalityType> EnsureTrackedAsync(string name)
    {
        var tracked = _context.ChangeTracker
            .Entries<LocalityType>()
            .FirstOrDefault(e => e.Entity.Name == name)?
            .Entity;

        if (tracked is not null)
        {
            return tracked;
        }

        var newLocalityType = new LocalityType { Name = name };
        await _context.LocalityTypes.AddAsync(newLocalityType);
        
        return newLocalityType;
    }
}