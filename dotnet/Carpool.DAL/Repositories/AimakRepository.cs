using System;
using Carpool.DAL.Interfaces;
using Carpool.Entities;
using GameStore.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories;

public class AimakRepository(ApplicationDbContext context) : IAimakRepository
{
    private readonly ApplicationDbContext _context = context;

    public async Task<IEnumerable<Aimak>> GetAllAsTrackingAsync()
    {
        return await _context.Aimaks.ToListAsync();
    }

    public async Task<Aimak> EnsureTrackedAsync(string name, District district)
    {
        var tracked = _context.ChangeTracker
            .Entries<Aimak>()
            .FirstOrDefault(e => e.Entity.Name == name && e.Entity.DistrictId == district.Id)?
            .Entity;

        if (tracked is not null)
        {
            return tracked;
        }

        var newAimak = new Aimak { Name = name, District = district };
        await _context.Aimaks.AddAsync(newAimak);

        return newAimak;
    }
}
