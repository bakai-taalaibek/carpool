using System.ComponentModel.DataAnnotations;

namespace Carpool.Contracts.DTOs
{
    public class LoginRequestDto
    {
        [Required]
        [MinLength(1)]
        [MaxLength(255)]
        public required string Identifier { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}