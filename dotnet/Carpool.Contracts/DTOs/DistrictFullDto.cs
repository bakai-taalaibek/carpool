using System;

namespace Carpool.Contracts.DTOs;

public class DistrictFullDto
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required RegionFullDto Region { get; set; }
}
