using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Mappers;

public static class DistrictExtensions
{
    public static DistrictFullDto ToFullDto (this District district)
    {
        return new DistrictFullDto
        {
            Id = district.Id,
            Name = district.Name,
            Region = district?.Region?.ToFullDto(),
        };
    }
}
