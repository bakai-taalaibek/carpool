using System;

namespace Carpool.Contracts.DTOs;

public class ForgotPasswordRequestDto
{
    public required string Email { get; set; }
}
