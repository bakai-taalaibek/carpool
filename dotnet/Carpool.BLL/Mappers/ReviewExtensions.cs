using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Mappers;

public static class ReviewExtensions
{
    public static ReviewFullDto ToFullDto (this Review review)
    {
        return new ReviewFullDto
        {
            Id = review.Id,
            UserId = review.UserId,
            Text = review.Text,
            AnonEmail = review.AnonEmail
        };
    }
}
