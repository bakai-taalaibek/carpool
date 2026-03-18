using System;

namespace Carpool.Contracts.DTOs;

public class RequestEmailVerificationDto
{
    public string? UserId { get; set; }

    public string? Email { get; set; }

}
