using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.PostQueryPipelineSteps;

public class PostFilterBySource : IPostQueryPipelineStep
{
    public IQueryable<Post> Execute(IQueryable<Post> input, PostQueryParameters parameters)
    {
        if (parameters.SourceId.HasValue)
        {
            input = input.Where(p => p.SourceId == parameters.SourceId.Value);
        }

        return input;
    }
}

