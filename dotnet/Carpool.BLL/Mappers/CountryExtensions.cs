using System;
using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Mappers;

public static class CountryExtension
{
    public static CountryFullDto ToFullDto (this Country country)
    {
        return new CountryFullDto
        {
            Id = country.Id,
            Name = country.Name,
        };
    }
}
