using System;

namespace Carpool.Contracts.DTOs;

public class ResetPasswordRequestDto
{
    public required string Email { get; set; }

    public required string Token { get; set; }

    public required string Password { get; set; }
}
