using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.PostQueryPipelineSteps;

public interface IPostQueryPipelineStep
{
    IQueryable<Post> Execute(IQueryable<Post> input, PostQueryParameters parameters);
}
