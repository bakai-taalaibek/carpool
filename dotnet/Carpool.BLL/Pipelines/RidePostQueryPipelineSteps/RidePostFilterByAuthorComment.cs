using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.RidePostQueryPipelineSteps;

public class RidePostFilterByAuthorComment : IRidePostQueryPipelineStep
{
    public IQueryable<RidePost> Execute(
        IQueryable<RidePost> input, RidePostQueryParameters parameters)
    {
        if (string.IsNullOrEmpty(parameters.AuthorComment))
        {
            return input;
        }

        return input.Where(p =>
            p.Comment != null && p.Comment.ToLower().Contains(parameters.AuthorComment.ToLower()));
    }
}


