namespace Carpool.Contracts.DTOs;

public class RegionFullDto
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required CountryFullDto Country { get; set; }
}
