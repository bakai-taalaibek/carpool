using Carpool.Contracts.DTOs;

namespace Carpool.BLL.Intefaces;

public interface ILocalityService
{
    Task<IEnumerable<LocalityFullDto>> GetAllAsync();
}
