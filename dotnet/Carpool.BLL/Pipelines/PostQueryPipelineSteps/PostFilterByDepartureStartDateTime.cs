using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.PostQueryPipelineSteps;

public class PostFilterByDepartureStartDateTime : IPostQueryPipelineStep
{
    public IQueryable<Post> Execute(IQueryable<Post> input, PostQueryParameters parameters)
    {
        if (parameters.DepartureStartDateTime.HasValue)
        {
            input = input.Where(p => p.DepartureDateTime >= parameters.DepartureStartDateTime.Value);
        }

        return input;
    }
}

