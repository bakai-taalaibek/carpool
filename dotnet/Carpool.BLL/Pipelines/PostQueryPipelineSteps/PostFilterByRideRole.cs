using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.PostQueryPipelineSteps;

public class PostFilterByRideRole : IPostQueryPipelineStep
{
    public IQueryable<Post> Execute(IQueryable<Post> input, PostQueryParameters parameters)
    {
        if (parameters.PostAuthorRoleId.HasValue)
        {
            input = input.Where(p => p.RideRoleId == parameters.PostAuthorRoleId.Value);
        }

        return input;
    }
}

