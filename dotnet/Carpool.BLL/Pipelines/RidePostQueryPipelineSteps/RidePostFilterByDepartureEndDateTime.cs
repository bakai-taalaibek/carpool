using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.RidePostQueryPipelineSteps;

public class RidePostFilterByDepartureEndDateTime : IRidePostQueryPipelineStep
{
    public IQueryable<RidePost> Execute(
        IQueryable<RidePost> input, RidePostQueryParameters parameters)
    {
        if (parameters.DepartureEndDateTime.HasValue)
        {
            input = input.Where(p => p.DepartureDateTime <= parameters.DepartureEndDateTime.Value);
        }

        return input;
    }
}

