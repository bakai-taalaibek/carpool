using Carpool.Contracts.DTOs;

namespace Carpool.BLL.Services;

public interface ICommentService
{
    Task<IEnumerable<CommentFullDto>> GetAllAsync();

    Task<IEnumerable<CommentWithUserInfoDto>> GetByRidePostIdAsync(int ridePostId);

    Task<CommentFullDto> AddAsync(CommentCreateDto comment, string? userId, Guid? guestId);

    Task<CommentFullDto> UpdateAsync(CommentFullDto comment);

    Task DeleteAsync(int id);
}
