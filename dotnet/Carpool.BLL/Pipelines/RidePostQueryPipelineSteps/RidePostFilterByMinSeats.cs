using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.RidePostQueryPipelineSteps;

public class RidePostFilterByMinSeats : IRidePostQueryPipelineStep
{
    public IQueryable<RidePost> Execute(
        IQueryable<RidePost> input, RidePostQueryParameters parameters)
    {
        if (parameters.MinSeats == null)
        {
            return input;
        }

        return input.Where(p => p.Seats >= parameters.MinSeats);
    }
}

