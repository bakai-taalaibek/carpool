using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.PostQueryPipelineSteps;

public class PostFilterByDepartureEndDateTime : IPostQueryPipelineStep
{
    public IQueryable<Post> Execute(IQueryable<Post> input, PostQueryParameters parameters)
    {
        if (parameters.DepartureEndDateTime.HasValue)
        {
            input = input.Where(p => p.DepartureDateTime <= parameters.DepartureEndDateTime.Value);
        }

        return input;
    }
}

