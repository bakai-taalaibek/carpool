using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.RidePostQueryPipelineSteps;

public interface IRidePostQueryPipelineStep
{
    IQueryable<RidePost> Execute(
        IQueryable<RidePost> input, RidePostQueryParameters parameters);
}
