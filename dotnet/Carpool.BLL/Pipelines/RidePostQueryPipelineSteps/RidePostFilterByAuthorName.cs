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
            p.AnonName.ToLower().Contains(parameters.AuthorName.ToLower()))
            ||
            (p.User != null && p.User.DisplayName != null &&
                p.User.DisplayName.ToLower().Contains(parameters.AuthorName.ToLower())));
    }
}


