using Carpool.Contracts.DTOs;
using Carpool.DAL.Entities;

namespace Carpool.BLL.Mappers;

public static class CommentExtensions
{
    public static CommentFullDto ToFullDto(this Comment comment)
    {
        return new CommentFullDto
        {
            Id = comment.Id,
            UserId = comment.UserId,
            GuestId = comment.GuestId,
            Content = comment.Content,
            ParentId = comment.ParentId,
            RidePostId = comment.RidePostId,
            IsEdited = comment.IsEdited,
            DateCreated = comment.DateCreated,
            DateModified = comment.DateModified,
        };
    }

}
