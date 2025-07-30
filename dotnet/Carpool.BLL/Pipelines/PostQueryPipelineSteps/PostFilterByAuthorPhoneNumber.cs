using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.PostQueryPipelineSteps;

public class PostFilterByAuthorPhoneNumber : IPostQueryPipelineStep
{
    public IQueryable<Post> Execute(IQueryable<Post> input, PostQueryParameters parameters)
    {
        if (string.IsNullOrEmpty(parameters.AuthorPhoneNumber))
        {
            return input;
        }

        return input.Where(p =>
            p.AnonPhone == parameters.AuthorPhoneNumber ||
            (p.User != null && p.User.PhoneNumber == parameters.AuthorPhoneNumber));
    }
}


