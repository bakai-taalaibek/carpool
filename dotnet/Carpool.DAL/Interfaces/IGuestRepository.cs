using Carpool.Entities;

namespace Carpool.DAL.Interfaces;

public interface IGuestRepository
{
    Task<Guest> GetByIdAsync(Guid guestId);

    Task<Guest> AddAsync(Guest guest);
}
