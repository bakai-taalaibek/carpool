namespace Carpool.Contracts.DTOs;

public class CommentCreateDto
{
    public int? ParentId { get; set; }
    public required string Content { get; set; }
    public int? RidePostId { get; set; }
}
