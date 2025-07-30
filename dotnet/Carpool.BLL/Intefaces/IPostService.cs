using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Intefaces;

public interface IPostService
{
    Task<PostsPagedResponse> GetAsync(
        PostQueryParameters parameters,
        string? userId = null,
        Guid? guestId = null);

    Task<PostFullDto> GetByIdAsync(int id);

    Task<IEnumerable<PostFullDto>> GetByUserIdAsync(string userId);

    Task<PostFullDto> AddAsync(PostFullDto post);

    Task<PostFullDto> UpdateAsync(PostFullDto post);

    Task DeleteAsync(int id);
}
