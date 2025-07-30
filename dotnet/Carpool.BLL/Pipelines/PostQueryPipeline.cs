using Carpool.BLL.Pipelines.PostQueryPipelineSteps;
using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines;

public class PostQueryPipeline
{
    private readonly List<IPostQueryPipelineStep> _filters = new();

    public PostQueryPipeline Register(IPostQueryPipelineStep filter)
    {
        _filters.Add(filter);
        return this;
    }

    public IQueryable<Post> Process(IQueryable<Post> input, PostQueryParameters parameters)
    {
        foreach (var filter in _filters)
        {
            input = filter.Execute(input, parameters);
        }

        return input;
    }
}