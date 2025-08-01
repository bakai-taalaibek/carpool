using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.RidePostQueryPipelineSteps;

public class RidePostFilterByCurrentUser(string? userId, Guid? guestId)
    : IRidePostQueryPipelineStep
{
    private string? _userId = userId;
    private Guid? _guestId = guestId;

    public IQueryable<RidePost> Execute(
        IQueryable<RidePost> input, RidePostQueryParameters parameters)
    {
        if (!parameters.OnlyOwnRidePosts)
        {
            return input;
        }
        else if (!string.IsNullOrEmpty(_userId))
        {
            return input.Where(p => p.UserId == _userId);
        }
        else if (_guestId is not null)
        {
            return input.Where(p => p.GuestId == _guestId);
        }

        throw new ArgumentException("Either userId or guestId must be provided when filtering by current user.");
    }
}

