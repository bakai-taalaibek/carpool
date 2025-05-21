namespace Carpool.Contracts.DTOs;

public class PostFullDto
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int RideRoleId { get; set; }

    public int SourceId { get; set; }

    public int DestinationId { get; set; }

    public DateTimeOffset DepartureDateTime { get; set; }

    public int Seats { get; set; }

    public int? PricePerSeat { get; set; }

    public int? PricePerCar { get; set; }

    public string? Comment { get; set; }

    public DateTimeOffset DateCreated { get; set; }

    public DateTimeOffset DateModified { get; set; }

    public string? AnonName { get; set; }

    public string? AnonPhone { get; set; }

    public string? AnonCar { get; set; }

    public RideRoleFullDto? RideRole { get; set; }

    public LocalityFullDto? Source { get; set; }

    public LocalityFullDto? Destination { get; set; }
}
