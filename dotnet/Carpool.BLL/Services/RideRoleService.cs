using Carpool.BLL.Intefaces;
using Carpool.BLL.Mappers;
using Carpool.Contracts.DTOs;
using Carpool.DAL.Interfaces;

namespace Carpool.BLL.Services;

public class RideRoleService(IUnitOfWork unitOfWork) : IRideRoleService
{
    private IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<IEnumerable<RideRoleFullDto>> GetAllAsync()
    {
        var rideRoles = await _unitOfWork.RideRoles.GetAllAsync();

        return rideRoles.Select(i => i.ToFullDto());
    }
}
