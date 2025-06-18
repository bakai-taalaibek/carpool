using System;
using Carpool.DAL.Interfaces;
using Carpool.Entities;
using GameStore.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories;

public class DistrictRepository(ApplicationDbContext context) : IDistrictRepository
{
    private readonly ApplicationDbContext _context = context;
    
    public async Task<IEnumerable<District>> GetAllAsTrackingAsync()
    {
        return await _context.Districts.ToListAsync();
    }

    public async Task<District> EnsureTrackedAsync(string name, Region region)
    {
        var tracked = _context.ChangeTracker
            .Entries<District>()
            .FirstOrDefault(e => e.Entity.Name == name && e.Entity.RegionId == region.Id)?
            .Entity;

        if (tracked is not null)
        {
            return tracked;
        }

        var newDistrict = new District { Name = name, Region = region };
        await _context.Districts.AddAsync(newDistrict);
        
        return newDistrict;
    }
}
