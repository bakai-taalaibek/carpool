namespace Carpool.Contracts.DTOs;

public class LocalityFullDto
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public string? OldName { get; set; }

    public string? SearchString { get; set; }

    public string? AimakName { get; set; }

    public string? DistrictName { get; set; }

    public string? RegionName { get; set; }

    public string? CountryName { get; set; }
}