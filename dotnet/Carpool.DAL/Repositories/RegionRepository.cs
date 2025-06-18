using System;
using Carpool.DAL.Interfaces;
using Carpool.Entities;
using GameStore.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories;

public class RegionRepository(ApplicationDbContext context) : IRegionRepository
{
    private readonly ApplicationDbContext _context = context;

    public async Task<IEnumerable<Region>> GetAllAsTrackingAsync()
    {
        return await _context.Regions.ToListAsync();
    }
    
    public async Task<Region> EnsureTrackedAsync(string name, Country country)
    {
        var tracked = _context.ChangeTracker
            .Entries<Region>()
            .FirstOrDefault(e => e.Entity.Name == name)?
            .Entity;

        if (tracked is not null)
        {
            return tracked;
        }

        var newRegion = new Region { Name = name, Country = country };
        await _context.Regions.AddAsync(newRegion);

        return newRegion;
    }
}
