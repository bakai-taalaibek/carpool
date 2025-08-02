namespace Carpool.BLL.Intefaces;

public interface IGuestService
{
    Task EnsureGuestExistsIfAnonymousAsync(string? userId, Guid? guestId);
}
