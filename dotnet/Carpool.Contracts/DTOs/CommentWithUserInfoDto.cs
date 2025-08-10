namespace Carpool.Contracts.DTOs;

public class CommentWithUserInfoDto
{
    public int Id { get; set; }
    public int? ParentId { get; set; }
    public required string Content { get; set; }
    public string? UserId { get; set; }
    public Guid? GuestId { get; set; }
    public string? UserDisplayName { get; set; }
    public string? UserAvatar { get; set; }
    public int? RidePostId { get; set; }
    public bool IsDeleted { get; set; }
    public bool IsEdited { get; set; }
    public DateTimeOffset DateCreated { get; set; }
    public DateTimeOffset DateModified { get; set; }
}
