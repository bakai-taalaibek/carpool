using Carpool.Contracts.DTOs;
using Carpool.Entities;
using Carpool.Shared.RidePostQueryOptions;

namespace Carpool.BLL.Pipelines.RidePostQueryPipelineSteps;

public class RidePostApplySorting : IRidePostQueryPipelineStep
{
    public IQueryable<RidePost> Execute(
        IQueryable<RidePost> input, RidePostQueryParameters parameters)
    {
        return parameters.Sort switch
        {
            SortingOptions.Cheaper => input.OrderBy(g => g.PricePerSeat),
            SortingOptions.MoreExpensive => input.OrderByDescending(g => g.PricePerSeat),
            SortingOptions.Sooner => input.OrderBy(g => g.DepartureDateTime),
            SortingOptions.Later => input.OrderByDescending(g => g.DepartureDateTime),
            SortingOptions.FewerSeats => input.OrderBy(g => g.Seats),
            SortingOptions.MoreSeats => input.OrderByDescending(g => g.Seats),
            _ => input,
        };
    }
}


