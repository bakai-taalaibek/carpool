using Carpool.BLL.Intefaces;
using Carpool.BLL.Mappers;
using Carpool.BLL.Pipelines;
using Carpool.BLL.Pipelines.PostQueryPipelineSteps;
using Carpool.Contracts.DTOs;
using Carpool.DAL.Interfaces;
using Carpool.Entities;
using Microsoft.EntityFrameworkCore;

namespace Carpool.BLL.Services;

public class PostService(IUnitOfWork unitOfWork) : IPostService
{
    private IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<PostsPagedResponse> GetAsync(
        PostQueryParameters parameters,
        string? userId = null,
        Guid? guestId = null)
    {
        var posts = _unitOfWork.Posts.GetAllAsQueryable();

        var postPipeline = new PostQueryPipeline()
            .Register(new PostFilterByRideRole())
            .Register(new PostFilterByCurrentUser(userId, guestId))
            .Register(new PostFilterBySource())
            .Register(new PostFilterByDestination())
            .Register(new PostFilterByMinPrice())
            .Register(new PostFilterByMaxPrice())
            .Register(new PostFilterByDepartureStartDateTime())
            .Register(new PostFilterByDepartureEndDateTime())
            .Register(new PostFilterByMinSeats())
            .Register(new PostFilterByMaxSeats())
            .Register(new PostFilterByAuthorName())
            .Register(new PostFilterByAuthorPhoneNumber())
            .Register(new PostFilterByAuthorComment())
            .Register(new PostApplySorting());

        posts = postPipeline.Process(posts, parameters);
        (posts, var numberOfPages) = ApplyPagination(posts, parameters);

        var postsFromDatabase = (await posts.ToListAsync()).Select(i => i.ToFullDto());

        PostsPagedResponse postsPaged = new()
        {
            Posts = postsFromDatabase,
            CurrentPage = Math.Min(parameters.Page, numberOfPages),
            TotalPages = numberOfPages,
        };

        return postsPaged;
    }

    public async Task<PostFullDto> GetByIdAsync(int id)
    {
        var post = await _unitOfWork.Posts.GetByIdAsync(id);

        return post.ToFullDto();
    }

    public async Task<IEnumerable<PostFullDto>> GetByUserIdAsync(string userId)
    {
        var posts = await _unitOfWork.Posts.GetByUserIdAsync(userId);

        return posts.Select(p => p.ToFullDto());
    }

    public async Task<PostFullDto> AddAsync(PostFullDto post)
    {
        Post newPost = new()
        {
            UserId = post.UserId,
            RideRoleId = post.RideRoleId,
            SourceId = post.SourceId,
            DestinationId = post.DestinationId,
            DepartureDateTime = post.DepartureDateTime,
            Seats = post.Seats,
            PricePerSeat = post.PricePerSeat,
            PricePerCar = post.PricePerCar,
            Comment = post.Comment,
            DateCreated = post.DateCreated,
            DateModified = post.DateModified,
            AnonName = post.AnonName,
            AnonPhone = post.AnonPhone,
            AnonCar = post.AnonCar,
        };

        var result = await _unitOfWork.Posts.AddAsync(newPost);

        return result.ToFullDto();
    }

    public async Task<PostFullDto> UpdateAsync(PostFullDto post)
    {
        var postToUpdate = await _unitOfWork.Posts.GetByIdAsync(post.Id);

        postToUpdate.UserId = post.UserId;
        postToUpdate.RideRoleId = post.RideRoleId;
        postToUpdate.SourceId = post.SourceId;
        postToUpdate.DestinationId = post.DestinationId;
        postToUpdate.DepartureDateTime = post.DepartureDateTime;
        postToUpdate.Seats = post.Seats;
        postToUpdate.PricePerSeat = post.PricePerSeat;
        postToUpdate.PricePerCar = post.PricePerCar;
        postToUpdate.Comment = post.Comment;
        postToUpdate.DateCreated = post.DateCreated;
        postToUpdate.DateModified = DateTimeOffset.UtcNow;
        postToUpdate.AnonName = post.AnonName;
        postToUpdate.AnonPhone = post.AnonPhone;
        postToUpdate.AnonCar = post.AnonCar;

        var result = await _unitOfWork.Posts.UpdateAsync(postToUpdate);

        return result.ToFullDto();
    }

    public async Task DeleteAsync(int id)
    {
        var post = await _unitOfWork.Posts.GetByIdAsync(id);

        await _unitOfWork.Posts.DeleteAsync(post.Id);
    }

    private (IQueryable<Post> Posts, int NumberOfPages) ApplyPagination(
        IQueryable<Post> input, PostQueryParameters parameters)
    {
        int pageSize = parameters.PageSize;
        input = input
            .Skip((parameters.Page - 1) * pageSize)
            .Take(pageSize);

        var numberOfPages = (int)Math.Ceiling(input.Count() / (double)pageSize);

        return (input, numberOfPages);
    }
}
