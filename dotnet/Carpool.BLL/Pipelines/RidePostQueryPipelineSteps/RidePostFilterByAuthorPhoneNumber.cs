using Carpool.Contracts.DTOs;
using Carpool.Entities;

namespace Carpool.BLL.Pipelines.RidePostQueryPipelineSteps;

public class RidePostFilterByAuthorPhoneNumber : IRidePostQueryPipelineStep
{
    public IQueryable<RidePost> Execute(
        IQueryable<RidePost> input, RidePostQueryParameters parameters)
    {
        if (string.IsNullOrEmpty(parameters.AuthorPhoneNumber))
        {
            return input;
        }

        return input.Where(p =>
            p.AnonPhone == parameters.AuthorPhoneNumber ||
            (p.User != null &&
            p.User.PhoneNumber != null &&
            p.User.PhoneNumber
                .Replace(" ", "")
                .Contains(parameters.AuthorPhoneNumber.Replace(" ", ""))));
    }
}


