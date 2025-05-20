using System;
using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Mappers;

public static class LocalityExtensions
{
    public static LocalityFullDto ToFullDto (this Locality locality)
    {
        return new LocalityFullDto
        {
            Id = locality.Id,
            Name = locality.Name,
            District = locality.District.ToFullDto(),
        };
    }

}
