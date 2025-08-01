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
            SortingOptions.Newest => input.OrderByDescending(g => g.DateCreated),
            SortingOptions.Oldest => input.OrderBy(g => g.DateCreated),
            SortingOptions.Cheapest => input.OrderBy(g => g.PricePerSeat),
            SortingOptions.MostExpensive => input.OrderByDescending(g => g.PricePerSeat),
            _ => input,
        };
    }
}


