namespace Carpool.Contracts.DTOs;

public class AimakFullDto
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public DistrictFullDto? District { get; set; }
}
