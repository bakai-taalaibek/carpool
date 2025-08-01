namespace Carpool.Contracts.DTOs;

public class RidePostsPagedResponse
{
    public IEnumerable<RidePostFullDto> RidePosts { get; set; } = [];

    public int TotalPages { get; set; }

    public int CurrentPage { get; set; }
}
