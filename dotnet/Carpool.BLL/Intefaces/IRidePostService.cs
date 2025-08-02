using Carpool.Contracts.DTOs;

namespace Carpool.BLL.Intefaces;

public interface IRidePostService
{
    Task<RidePostsPagedResponse> GetAsync(
        RidePostQueryParameters parameters,
        string? userId = null,
        Guid? guestId = null);

    Task<RidePostFullDto> GetByIdAsync(int id);

    Task<IEnumerable<RidePostFullDto>> GetByUserIdAsync(string userId);

    Task<RidePostFullDto> AddAsync(RidePostCreateDto ridePost, string? userId, Guid? guestId);

    Task<RidePostFullDto> UpdateAsync(RidePostFullDto ridePost);

    Task DeleteAsync(int id);
}
