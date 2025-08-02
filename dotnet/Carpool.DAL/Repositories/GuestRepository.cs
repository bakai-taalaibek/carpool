using Carpool.DAL.Interfaces;
using Carpool.Entities;
using GameStore.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories;

public class GuestRepository(ApplicationDbContext context) : IGuestRepository
{
    private readonly ApplicationDbContext _context = context;

    public async Task<Guest> GetByIdAsync(Guid id)
    {
        var guest = await _context.Guests
            .AsNoTracking().FirstOrDefaultAsync(i => i.Id == id)
                ?? throw new NotFoundException($"Guest with id {id} not found");

        return guest;
    }

    public async Task<Guest> AddAsync(Guest guest)
    {
        await _context.Guests.AddAsync(guest);
        await _context.SaveChangesAsync();

        return guest;
    }
}
