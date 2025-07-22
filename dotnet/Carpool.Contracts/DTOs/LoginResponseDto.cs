namespace Carpool.Contracts.DTOs
{
    public class LoginResponseDto
    {
        public string Token { get; set; } = default!;

        public UserFullDto User { get; set; } = default!;

        public DateTimeOffset ExpiresAt { get; set; }
    }
}