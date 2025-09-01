using Carpool.BLL.Mappers;
using Carpool.Contracts.DTOs;
using Carpool.DAL.Entities;
using Carpool.DAL.Interfaces;

namespace Carpool.BLL.Services;

public class CommentService(IUnitOfWork unitOfWork) : ICommentService
{
    private IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<IEnumerable<CommentFullDto>> GetAllAsync()
    {
        var comments = await _unitOfWork.Comments.GetAllAsync();

        return comments.Select(p => p.ToFullDto());
    }

    public async Task<IEnumerable<CommentWithUserInfoDto>> GetByRidePostIdAsync(int ridePostId)
    {
        var comments = await _unitOfWork.Comments.GetByRidePostIdAsync(ridePostId);

        return comments.Select(i =>
        {
            return new CommentWithUserInfoDto
            {
                Id = i.Id,
                UserId = i.UserId,
                GuestId = i.GuestId,
                Content = i.IsDeleted ? "Комментарий удален" : i.Content,
                ParentId = i.ParentId,
                RidePostId = i.RidePostId,
                IsEdited = i.IsEdited,
                IsDeleted = i.IsDeleted,
                DateCreated = i.DateCreated,
                DateModified = i.DateModified,
                UserDisplayName = i.User?.DisplayName
            };
        });
    }

    public async Task<CommentFullDto> AddAsync(
        CommentCreateDto comment, string? userId, Guid? guestId)
    {
        Comment newComment = new()
        {
            UserId = userId,
            GuestId = guestId,
            Content = comment.Content,
            ParentId = comment.ParentId,
            RidePostId = comment.RidePostId,
            DateCreated = DateTimeOffset.UtcNow,
            DateModified = DateTimeOffset.UtcNow,
        };

        var result = await _unitOfWork.Comments.AddAsync(newComment);

        return result.ToFullDto();
    }

    public async Task<CommentFullDto> UpdateAsync(CommentFullDto comment)
    {
        var commentToUpdate = await _unitOfWork.Comments.GetByIdAsync(comment.Id);
        commentToUpdate.Content = comment.Content;
        commentToUpdate.IsEdited = true;
        commentToUpdate.DateModified = DateTimeOffset.UtcNow;

        var result = await _unitOfWork.Comments.UpdateAsync(commentToUpdate);

        return result.ToFullDto();
    }

    public async Task DeleteAsync(int id)
    {
        var comment = await _unitOfWork.Comments.GetByIdAsync(id);
        comment.IsDeleted = true;
        comment.DateModified = DateTimeOffset.UtcNow;

        await _unitOfWork.Comments.UpdateAsync(comment);
    }
}
