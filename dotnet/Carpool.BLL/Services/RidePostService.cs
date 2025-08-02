using Carpool.BLL.Intefaces;
using Carpool.BLL.Mappers;
using Carpool.BLL.Pipelines;
using Carpool.BLL.Pipelines.RidePostQueryPipelineSteps;
using Carpool.Contracts.DTOs;
using Carpool.DAL.Interfaces;
using Carpool.Entities;
using Microsoft.EntityFrameworkCore;

namespace Carpool.BLL.Services;

public class RidePostService(IUnitOfWork unitOfWork) : IRidePostService
{
    private IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<RidePostsPagedResponse> GetAsync(
        RidePostQueryParameters parameters,
        string? userId = null,
        Guid? guestId = null)
    {
        var ridePosts = _unitOfWork.RidePosts.GetAllAsQueryable();

        var ridePostPipeline = new RidePostQueryPipeline()
            .Register(new RidePostFilterByRideRole())
            .Register(new RidePostFilterByCurrentUser(userId, guestId))
            .Register(new RidePostFilterBySource())
            .Register(new RidePostFilterByDestination())
            .Register(new RidePostFilterByMinPrice())
            .Register(new RidePostFilterByMaxPrice())
            .Register(new RidePostFilterByDepartureStartDateTime())
            .Register(new RidePostFilterByDepartureEndDateTime())
            .Register(new RidePostFilterByMinSeats())
            .Register(new RidePostFilterByMaxSeats())
            .Register(new RidePostFilterByAuthorName())
            .Register(new RidePostFilterByAuthorPhoneNumber())
            .Register(new RidePostFilterByAuthorComment())
            .Register(new RidePostApplySorting());

        ridePosts = ridePostPipeline.Process(ridePosts, parameters);
        (ridePosts, var numberOfPages) = ApplyPagination(ridePosts, parameters);

        var ridePostsFromDatabase = (await ridePosts.ToListAsync()).Select(i => i.ToFullDto());

        RidePostsPagedResponse ridePostsPaged = new()
        {
            RidePosts = ridePostsFromDatabase,
            CurrentPage = Math.Min(parameters.Page, numberOfPages),
            TotalPages = numberOfPages,
        };

        return ridePostsPaged;
    }

    public async Task<RidePostFullDto> GetByIdAsync(int id)
    {
        var ridePost = await _unitOfWork.RidePosts.GetByIdAsync(id);

        return ridePost.ToFullDto();
    }

    public async Task<IEnumerable<RidePostFullDto>> GetByUserIdAsync(string userId)
    {
        var ridePosts = await _unitOfWork.RidePosts.GetByUserIdAsync(userId);

        return ridePosts.Select(p => p.ToFullDto());
    }

    public async Task<RidePostFullDto> AddAsync(
        RidePostCreateDto ridePost, string? userId, Guid? guestId)
    {
        RidePost newRidePost = new()
        {
            UserId = userId,
            GuestId = guestId,
            RideRoleId = ridePost.RideRoleId,
            SourceId = ridePost.SourceId,
            DestinationId = ridePost.DestinationId,
            DepartureDateTime = ridePost.DepartureDateTime,
            Seats = ridePost.Seats,
            PricePerSeat = ridePost.PricePerSeat,
            PricePerCar = ridePost.PricePerCar,
            Comment = ridePost.Comment,
            DateCreated = DateTimeOffset.UtcNow,
            DateModified = DateTimeOffset.UtcNow,
            AnonName = ridePost.AnonName,
            AnonPhone = ridePost.AnonPhone,
            AnonCar = ridePost.AnonCar,
        };

        var result = await _unitOfWork.RidePosts.AddAsync(newRidePost);

        return result.ToFullDto();
    }

    public async Task<RidePostFullDto> UpdateAsync(RidePostFullDto ridePost)
    {
        var ridePostToUpdate = await _unitOfWork.RidePosts.GetByIdAsync(ridePost.Id);

        ridePostToUpdate.UserId = ridePost.UserId;
        ridePostToUpdate.RideRoleId = ridePost.RideRoleId;
        ridePostToUpdate.SourceId = ridePost.SourceId;
        ridePostToUpdate.DestinationId = ridePost.DestinationId;
        ridePostToUpdate.DepartureDateTime = ridePost.DepartureDateTime;
        ridePostToUpdate.Seats = ridePost.Seats;
        ridePostToUpdate.PricePerSeat = ridePost.PricePerSeat;
        ridePostToUpdate.PricePerCar = ridePost.PricePerCar;
        ridePostToUpdate.Comment = ridePost.Comment;
        ridePostToUpdate.DateCreated = ridePost.DateCreated;
        ridePostToUpdate.DateModified = DateTimeOffset.UtcNow;
        ridePostToUpdate.AnonName = ridePost.AnonName;
        ridePostToUpdate.AnonPhone = ridePost.AnonPhone;
        ridePostToUpdate.AnonCar = ridePost.AnonCar;

        var result = await _unitOfWork.RidePosts.UpdateAsync(ridePostToUpdate);

        return result.ToFullDto();
    }

    public async Task DeleteAsync(int id)
    {
        var ridePost = await _unitOfWork.RidePosts.GetByIdAsync(id);

        await _unitOfWork.RidePosts.DeleteAsync(ridePost.Id);
    }

    private (IQueryable<RidePost> RidePosts, int NumberOfPages) ApplyPagination(
        IQueryable<RidePost> input, RidePostQueryParameters parameters)
    {
        int pageSize = parameters.PageSize;

        int totalNumberOfPages = input.Count();
        var numberOfPages = (int)Math.Ceiling(totalNumberOfPages / (double)pageSize);

        input = input
            .Skip((parameters.Page - 1) * pageSize)
            .Take(pageSize);

        return (input, numberOfPages);
    }
}
