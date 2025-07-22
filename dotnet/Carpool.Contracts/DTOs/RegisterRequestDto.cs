using System.ComponentModel.DataAnnotations;

namespace Carpool.Contracts.DTOs
{
    [RequireEmailOrPhone]
    public class RegisterRequestDto
    {
        [EmailAddress]
        [MinLength(1)]
        [MaxLength(255)]
        public string? Email { get; set; }

        [Phone]
        [MinLength(1)]
        [MaxLength(255)]
        public string? PhoneNumber { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}