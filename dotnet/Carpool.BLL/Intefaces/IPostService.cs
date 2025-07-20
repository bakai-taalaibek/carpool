using System;
using Carpool.Contracts.DTOs;

namespace Carpool.BLL.Intefaces;

public interface IPostService
{
    Task<IEnumerable<PostFullDto>> GetAllAsync();

    Task<PostFullDto> GetByIdAsync(int id);

    Task<IEnumerable<PostFullDto>> GetByUserIdAsync(string userId);

    Task<PostFullDto> AddAsync(PostFullDto post);

    Task<PostFullDto> UpdateAsync(PostFullDto post);

    Task DeleteAsync(int id);
}
