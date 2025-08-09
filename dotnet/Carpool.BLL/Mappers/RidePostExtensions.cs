using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Mappers;

public static class RidePostExtension
{
    public static RidePostFullDto ToFullDto(this RidePost ridePost)
    {
        return new RidePostFullDto
        {
            Id = ridePost.Id,
            UserId = ridePost.UserId,
            GuestId = ridePost.GuestId,
            RideRoleId = ridePost.RideRoleId,
            SourceId = ridePost.SourceId,
            DestinationId = ridePost.DestinationId,
            DepartureDateTime = ridePost.DepartureDateTime,
            Seats = ridePost.Seats,
            PricePerSeat = ridePost.PricePerSeat,
            PricePerCar = ridePost.PricePerCar,
            Comment = ridePost.Comment,
            DateCreated = ridePost.DateCreated,
            DateModified = ridePost.DateModified,
            AnonName = ridePost.AnonName,
            AnonPhone = ridePost.AnonPhone,
            AnonCar = ridePost.AnonCar,
            RideRole = ridePost.RideRole?.ToFullDto(),
            Source = ridePost.Source?.ToFullDto(),
            Destination = ridePost.Destination?.ToFullDto(),
        };
    }
}
