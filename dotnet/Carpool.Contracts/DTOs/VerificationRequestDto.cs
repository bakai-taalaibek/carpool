using System;

namespace Carpool.Contracts.DTOs;

public class VerificationRequestDto
{
    public required string UserId { get; set; }

    public required string Token { get; set; }
}
