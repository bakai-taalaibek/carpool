using System;
using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Mappers;

public static class RegionExtensions
{
    public static RegionFullDto ToFullDto (this Region region)
    {
        return new RegionFullDto
        {
            Id = region.Id,
            Name = region.Name,
            Country = region?.Country?.ToFullDto(),
        };
    }
}
