using System.Security.Claims;
using Carpool.BLL.Intefaces;
using Microsoft.AspNetCore.Http;

namespace Carpool.BLL.Services;

public class UserContextService(IHttpContextAccessor httpContextAccessor) : IUserContextService
{
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

    public (string? userId, Guid? guestId) GetUserIdAndGuestId()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var request = _httpContextAccessor.HttpContext?.Request;

        string? userId = user?.Identity?.IsAuthenticated == true
            ? user.FindFirstValue(ClaimTypes.NameIdentifier)
            : null;

        var guestIdRaw = request?.Headers["X-Guest-Id"].FirstOrDefault();

        Guid? guestId = null;
        if (!string.IsNullOrWhiteSpace(guestIdRaw))
        {
            if (!Guid.TryParse(guestIdRaw, out var parsedGuestId))
            {
                throw new BadHttpRequestException("Invalid Guest ID format");
            }

            guestId = parsedGuestId;
        }

        return (userId, guestId);
    }
}
