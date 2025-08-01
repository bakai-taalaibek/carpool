using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.RidePostQueryPipelineSteps;

public class RidePostFilterByMinPrice : IRidePostQueryPipelineStep
{
    public IQueryable<RidePost> Execute(
        IQueryable<RidePost> input, RidePostQueryParameters parameters)
    {
        if (parameters.MinPrice.HasValue)
        {
            input = input.Where(p => p.PricePerSeat >= parameters.MinPrice.Value);
        }

        return input;
    }
}

