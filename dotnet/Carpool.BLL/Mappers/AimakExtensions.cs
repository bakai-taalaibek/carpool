using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Mappers;

public static class AimakExtensions
{
    public static AimakFullDto ToFullDto (this Aimak aimak)
    {
        return new AimakFullDto
        {
            Id = aimak.Id,
            Name = aimak.Name,
            District = aimak?.District?.ToFullDto(),
        };
    }
}
