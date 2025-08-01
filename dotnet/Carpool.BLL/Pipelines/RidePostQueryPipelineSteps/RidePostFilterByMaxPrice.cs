using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.RidePostQueryPipelineSteps;

public class RidePostFilterByMaxPrice : IRidePostQueryPipelineStep
{
    public IQueryable<RidePost> Execute(
        IQueryable<RidePost> input, RidePostQueryParameters parameters)
    {
        if (parameters.MaxPrice.HasValue)
        {
            input = input.Where(p => p.PricePerSeat <= parameters.MaxPrice.Value);
        }

        return input;
    }
}

