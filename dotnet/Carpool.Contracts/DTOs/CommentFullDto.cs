namespace Carpool.Contracts.DTOs;

public class CommentFullDto
{
    public int Id { get; set; }
    public int? ParentId { get; set; }
    public required string Content { get; set; }
    public string? UserId { get; set; }
    public Guid? GuestId { get; set; }
    public int? RidePostId { get; set; }
    public bool IsDeleted { get; set; }
    public bool IsEdited { get; set; }
    public DateTimeOffset DateCreated { get; set; }
    public DateTimeOffset DateModified { get; set; }
}
