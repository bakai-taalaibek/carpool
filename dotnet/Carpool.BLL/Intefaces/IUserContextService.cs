namespace Carpool.BLL.Intefaces;

public interface IUserContextService
{
    (string? userId, Guid? guestId) GetUserIdAndGuestId();
}
