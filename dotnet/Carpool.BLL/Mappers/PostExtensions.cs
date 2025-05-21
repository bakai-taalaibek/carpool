using System;
using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Mappers;

public static class PostExtension
{
    public static PostFullDto ToFullDto (this Post post)
    {
        return new PostFullDto
        {
            Id = post.Id,
            UserId = post.UserId,
            RideRoleId = post.RideRoleId,
            SourceId = post.SourceId,
            DestinationId = post.DestinationId,
            DepartureDateTime = post.DepartureDateTime,
            Seats = post.Seats,
            PricePerSeat = post.PricePerSeat,
            PricePerCar = post.PricePerCar,
            Comment = post.Comment,
            DateCreated = post.DateCreated,
            DateModified = post.DateModified,
            AnonName = post.AnonName,
            AnonPhone = post.AnonPhone,
            AnonCar = post.AnonCar,
            RideRole = post.RideRole?.ToFullDto(),
            Source = post.Source?.ToFullDto(),
            Destination = post.Destination?.ToFullDto(),
        };
    }
}
