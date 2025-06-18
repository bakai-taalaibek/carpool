using System;
using Carpool.DAL.Interfaces;
using Carpool.Entities;
using GameStore.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories;

public class CountryRepository(ApplicationDbContext context) : ICountryRepository
{
    private readonly ApplicationDbContext _context = context;
    public async Task<IEnumerable<Country>> GetAllAsTrackingAsync()
    {
        return await _context.Countries.ToListAsync();
    }

    public async Task<Country> EnsureTrackedAsync(string name)
    {
        var tracked = _context.ChangeTracker
            .Entries<Country>()
            .FirstOrDefault(e => e.Entity.Name == name)?
            .Entity;

        if (tracked is not null)
        {
            return tracked;
        }

        var newCountry = new Country { Name = name };
        await _context.Countries.AddAsync(newCountry);

        return newCountry;
    }
}
