using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.RidePostQueryPipelineSteps;

public class RidePostFilterByRideRole : IRidePostQueryPipelineStep
{
    public IQueryable<RidePost> Execute(
        IQueryable<RidePost> input, RidePostQueryParameters parameters)
    {
        if (parameters.RidePostAuthorRoleId.HasValue)
        {
            input = input.Where(p => p.RideRoleId == parameters.RidePostAuthorRoleId.Value);
        }

        return input;
    }
}

