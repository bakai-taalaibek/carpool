using Carpool.Contracts.DTOs;

namespace Carpool.BLL.Intefaces;

public interface IRideRoleService
{
    Task<IEnumerable<RideRoleFullDto>> GetAllAsync();
}
