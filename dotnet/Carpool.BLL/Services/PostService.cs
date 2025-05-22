using Carpool.BLL.Intefaces;
using Carpool.BLL.Mappers;
using Carpool.Contracts.DTOs;
using Carpool.DAL;
using Carpool.DAL.Interfaces;
using Carpool.Entities;

namespace Carpool.BLL.Services;

public class PostService(IUnitOfWork unitOfWork) : IPostService
{
    private IUnitOfWork _unitOfWord = unitOfWork;

    public async Task<IEnumerable<PostFullDto>> GetAllAsync()
    {
        var posts = await _unitOfWord.Posts.GetAllAsync();

        return posts.Select(p => p.ToFullDto());
    }

    public async Task<PostFullDto> GetByIdAsync(int id)
    {
        var post = await _unitOfWord.Posts.GetByIdAsync(id);

        return post.ToFullDto();
    }

    public async Task<IEnumerable<PostFullDto>> GetByUserIdAsync(int userId)
    {
        var posts = await _unitOfWord.Posts.GetByUserIdAsync(userId);

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

        var result = await _unitOfWord.Posts.AddAsync(newPost);

        return result.ToFullDto();
    }

    public async Task<PostFullDto> UpdateAsync(PostFullDto post)
    {
        var postToUpdate = await _unitOfWord.Posts.GetByIdAsync(post.Id);

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

        var result = await _unitOfWord.Posts.UpdateAsync(postToUpdate);

        return result.ToFullDto();
    }

    public async Task DeleteAsync(int id)
    {
        var post = await _unitOfWord.Posts.GetByIdAsync(id);

        await _unitOfWord.Posts.DeleteAsync(post.Id);
    }
}
