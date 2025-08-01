using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.RidePostQueryPipelineSteps;

public class RidePostFilterByDepartureStartDateTime : IRidePostQueryPipelineStep
{
    public IQueryable<RidePost> Execute(
        IQueryable<RidePost> input, RidePostQueryParameters parameters)
    {
        if (parameters.DepartureStartDateTime.HasValue)
        {
            input = input.Where(p => p.DepartureDateTime >= parameters.DepartureStartDateTime.Value);
        }

        return input;
    }
}

