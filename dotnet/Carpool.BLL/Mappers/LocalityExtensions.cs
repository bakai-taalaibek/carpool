using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Mappers;

public static class LocalityExtensions
{
    public static LocalityFullDto ToFullDto(this Locality locality)
    {
        return new LocalityFullDto
        {
            Id = locality.Id,
            Name = locality.Name,
            OldName = locality.OldName,
            SearchString = locality.SearchString,
            AimakName = locality?.Aimak?.Name,
            DistrictName = locality?.District?.Name,
            RegionName = locality?.Region?.Name,
            CountryName = locality?.Country?.Name,
        };
    }

}
