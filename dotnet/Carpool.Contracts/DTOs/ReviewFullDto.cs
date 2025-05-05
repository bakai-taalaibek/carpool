namespace Carpool.Contracts.DTOs;

public class ReviewFullDto
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string Text { get; set; } = null!;

    public string? AnonEmail { get; set; }
}
