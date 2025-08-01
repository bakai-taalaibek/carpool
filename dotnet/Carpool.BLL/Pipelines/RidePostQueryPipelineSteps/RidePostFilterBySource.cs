using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.RidePostQueryPipelineSteps;

public class RidePostFilterBySource : IRidePostQueryPipelineStep
{
    public IQueryable<RidePost> Execute(
        IQueryable<RidePost> input, RidePostQueryParameters parameters)
    {
        if (parameters.SourceId.HasValue)
        {
            input = input.Where(p => p.SourceId == parameters.SourceId.Value);
        }

        return input;
    }
}

