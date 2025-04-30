using System;
using Carpool.DAL.Interfaces;
using Carpool.Entities;
using GameStore.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories;

public class LocalityRepository(ApplicationDbContext context) : ILocalityRepository
{
    private readonly ApplicationDbContext _context = context;
    public async Task<IEnumerable<Locality>> GetAllAsync()
    {
        return await _context.Localities.AsNoTracking().ToListAsync();
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
}
