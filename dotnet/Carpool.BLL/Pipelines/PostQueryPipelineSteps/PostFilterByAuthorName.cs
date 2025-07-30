using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.PostQueryPipelineSteps;

public class PostFilterByAuthorName : IPostQueryPipelineStep
{
    public IQueryable<Post> Execute(IQueryable<Post> input, PostQueryParameters parameters)
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


