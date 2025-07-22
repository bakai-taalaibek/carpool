namespace Carpool.Contracts.DTOs;

public class UserFullDto
{
    public string Id { get; set; } = default!;

    public string? Role { get; set; }

    public string? DisplayName { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Email { get; set; }

    public string? Car { get; set; }

    public string? About { get; set; }

    public string? Avatar { get; set; }

    public DateTimeOffset DateCreated { get; set; }
}
