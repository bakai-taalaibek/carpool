using System.ComponentModel.DataAnnotations;

namespace Carpool.Contracts.DTOs
{
    public class RegisterResponseDto
    {
        public string Message { get; set; } = default!;
    }
}