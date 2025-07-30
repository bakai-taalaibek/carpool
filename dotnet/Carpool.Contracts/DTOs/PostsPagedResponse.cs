namespace Carpool.Contracts.DTOs;

public class PostsPagedResponse
{
    public IEnumerable<PostFullDto> Posts { get; set; } = [];
    
    public int TotalPages { get; set; }

    public int CurrentPage { get; set; }
}
