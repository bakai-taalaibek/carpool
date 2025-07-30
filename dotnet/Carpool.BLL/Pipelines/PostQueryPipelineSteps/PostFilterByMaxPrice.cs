using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.PostQueryPipelineSteps;

public class PostFilterByMaxPrice : IPostQueryPipelineStep
{
    public IQueryable<Post> Execute(IQueryable<Post> input, PostQueryParameters parameters)
    {
        if (parameters.MaxPrice.HasValue)
        {
            input = input.Where(p => p.PricePerSeat <= parameters.MaxPrice.Value);
        }

        return input;
    }
}

