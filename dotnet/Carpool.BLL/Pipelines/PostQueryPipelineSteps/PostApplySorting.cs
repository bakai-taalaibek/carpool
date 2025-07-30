using Carpool.Contracts.DTOs;
using Carpool.Entities;
using Carpool.Shared.PostQueryOptions;

namespace Carpool.BLL.Pipelines.PostQueryPipelineSteps;

public class PostApplySorting : IPostQueryPipelineStep
{
    public IQueryable<Post> Execute(IQueryable<Post> input, PostQueryParameters parameters)
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


