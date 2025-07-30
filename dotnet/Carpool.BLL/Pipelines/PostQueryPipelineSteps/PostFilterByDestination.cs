using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.PostQueryPipelineSteps;

public class PostFilterByDestination : IPostQueryPipelineStep
{
    public IQueryable<Post> Execute(IQueryable<Post> input, PostQueryParameters parameters)
    {
        if (parameters.DestinationId.HasValue)
        {
            input = input.Where(p => p.DestinationId == parameters.DestinationId.Value);
        }

        return input;
    }
}

