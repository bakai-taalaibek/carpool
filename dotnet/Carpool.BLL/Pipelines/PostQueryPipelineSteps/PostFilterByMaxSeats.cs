using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.PostQueryPipelineSteps;

public class PostFilterByMaxSeats : IPostQueryPipelineStep
{
    public IQueryable<Post> Execute(IQueryable<Post> input, PostQueryParameters parameters)
    {
        return input.Where(p => p.Seats <= parameters.MaxSeats);
    }
}

