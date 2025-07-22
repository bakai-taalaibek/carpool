using System.ComponentModel.DataAnnotations;
using Carpool.Contracts.DTOs;

public class RequireEmailOrPhoneAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        var dto = (RegisterRequestDto)validationContext.ObjectInstance;

        if (string.IsNullOrWhiteSpace(dto.Email) && string.IsNullOrWhiteSpace(dto.PhoneNumber))
        {
            return new ValidationResult("Either Email or PhoneNumber must be provided.");
        }

        return ValidationResult.Success;
    }
}