using Carpool.DAL.Interfaces;
using Carpool.Entities;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories;

public class RideRoleRepository(ApplicationDbContext context) : IRideRoleRepository
{
    private readonly ApplicationDbContext _context = context;
    public async Task<IEnumerable<RideRole>> GetAllAsync()
    {
        return await _context.RideRoles.AsNoTracking().ToListAsync();
    }
}
