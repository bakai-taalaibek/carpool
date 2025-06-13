namespace Carpool.Contracts.DTOs;

public class LocalityFullDto
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public string? OldName { get; set; }

    public DistrictFullDto? District { get; set; }

    public AimakFullDto? Aimak { get; set; }
}