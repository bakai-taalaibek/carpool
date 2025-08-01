using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.RidePostQueryPipelineSteps;

public class RidePostFilterByAuthorName : IRidePostQueryPipelineStep
{
    public IQueryable<RidePost> Execute(
        IQueryable<RidePost> input, RidePostQueryParameters parameters)
    {
        if (string.IsNullOrEmpty(parameters.AuthorName))
        {
            return input;
        }

        return input.Where(p =>
            (p.AnonName != null &&
            p.AnonName.Contains(parameters.AuthorName))
            ||
            (p.User != null && p.User.DisplayName != null &&
                p.User.DisplayName.Contains(parameters.AuthorName)));
    }
}


