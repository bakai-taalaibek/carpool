using Carpool.BLL.Pipelines.RidePostQueryPipelineSteps;
using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines;

public class RidePostQueryPipeline
{
    private readonly List<IRidePostQueryPipelineStep> _filters = new();

    public RidePostQueryPipeline Register(IRidePostQueryPipelineStep filter)
    {
        _filters.Add(filter);
        return this;
    }

    public IQueryable<RidePost> Process(
        IQueryable<RidePost> input, RidePostQueryParameters parameters)
    {
        foreach (var filter in _filters)
        {
            input = filter.Execute(input, parameters);
        }

        return input;
    }
}