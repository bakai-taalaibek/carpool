using Carpool.BLL.Intefaces;
using Carpool.DAL.Interfaces;
using Carpool.Entities;
using GameStore.Shared.Exceptions;

namespace Carpool.BLL.Services;

public class GuestService(IUnitOfWork unitOfWork) : IGuestService
{
    private IUnitOfWork _unitOfWork = unitOfWork;

    public async Task EnsureGuestExistsIfAnonymousAsync(string? userId, Guid? guestId)
    {
        if (userId != null || guestId == null)
        {
            return;
        }

        try
        {
            await _unitOfWork.Guests.GetByIdAsync((Guid)guestId);
        }
        catch (NotFoundException)
        {
            var guest = new Guest
            {
                Id = (Guid)guestId,
                DateCreated = DateTimeOffset.UtcNow
            };

            await _unitOfWork.Guests.AddAsync(guest);
        }
    }
}
