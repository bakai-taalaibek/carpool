using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.PostQueryPipelineSteps;

public class PostFilterByAuthorComment : IPostQueryPipelineStep
{
    public IQueryable<Post> Execute(IQueryable<Post> input, PostQueryParameters parameters)
    {
        if (string.IsNullOrEmpty(parameters.AuthorComment))
        {
            return input;
        }

        return input.Where(p =>
            p.Comment != null && p.Comment.Contains(parameters.AuthorComment));
    }
}


