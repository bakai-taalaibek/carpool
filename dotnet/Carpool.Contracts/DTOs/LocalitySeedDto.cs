namespace Carpool.Contracts.DTOs;

public class LocalitySeedDto
{
    public required string Country { get; set; }

    public string? Region { get; set; }

    public string? District { get; set; }

    public string? Aimak { get; set; }

    public required string Locality { get; set; }

    public string? AltNames { get; set; }

    public string? OldName { get; set; }

    public string? SearchString { get; set; }

    public required string LocalityType { get; set; }
    
    public required int Population { get; set; }
}
