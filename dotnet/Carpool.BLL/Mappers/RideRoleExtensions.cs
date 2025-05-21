using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Mappers;

public static class RideRoleExtensions
{
    public static RideRoleFullDto ToFullDto (this RideRole rideRole)
    {
        return new RideRoleFullDto
        {
            Id = rideRole.Id,
            Name = rideRole.Name,
        };
    }
}
