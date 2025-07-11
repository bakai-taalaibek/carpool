using System;
using Carpool.DAL.Interfaces;
using Carpool.Entities;
using GameStore.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories;

public class LocalityRepository(ApplicationDbContext context) : ILocalityRepository
{
    private readonly ApplicationDbContext _context = context;

    public async Task<IEnumerable<Locality>> GetAllAsTrackingAsync()
    {
        return await _context.Localities.ToListAsync();
    }

    public async Task<IEnumerable<Locality>> GetAllAsync()
    {
        return await _context.Localities
            .Include(l => l.Aimak)
            .Include(a => a.District)
            .Include(d => d.Region)
            .Include(r => r.Country)
            .ToListAsync();
    }

    public async Task<Locality> GetByIdAsync(int id)
    {
        var locality = await _context.Localities
            .AsNoTracking()
            .FirstOrDefaultAsync(l => l.Id == id);

        return locality ?? throw new NotFoundException($"Locality with id {id} not found");
    }

    public async Task<IEnumerable<Locality>> GetByNameAsync(string name)
    {
        var localities = await _context.Localities
            .AsNoTracking()
            .Where(l => l.Name.Contains(name))
            .ToListAsync();

        return localities.Count > 0
                ? localities
                : throw new NotFoundException($"Locality with name {name} not found");
    }

    public async Task<Locality> EnsureTrackedAsync(Locality locality)
    {
        var tracked = _context.ChangeTracker
            .Entries<Locality>()
            .FirstOrDefault(e => e.Entity.Name == locality.Name
                && e.Entity.AimakId == locality.AimakId
                && e.Entity.DistrictId == locality.DistrictId
                && e.Entity.RegionId == locality.RegionId
                && e.Entity.CountryId == locality.CountryId)?
            .Entity;

        if (tracked is not null)
        {
            return tracked;
        }

        await _context.Localities.AddAsync(locality);
        return locality;
    }
}
