using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.PostQueryPipelineSteps;

public class PostFilterByMinPrice : IPostQueryPipelineStep
{
    public IQueryable<Post> Execute(IQueryable<Post> input, PostQueryParameters parameters)
    {
        if (parameters.MinPrice.HasValue)
        {
            input = input.Where(p => p.PricePerSeat >= parameters.MinPrice.Value);
        }

        return input;
    }
}

