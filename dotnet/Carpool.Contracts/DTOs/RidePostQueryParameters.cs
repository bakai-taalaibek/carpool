using System.ComponentModel.DataAnnotations;
using Carpool.Shared.RidePostQueryOptions;

namespace Carpool.Contracts.DTOs;

public class RidePostQueryParameters
{
    // Filtering
    public int? RidePostAuthorRoleId { get; set; }

    public bool OnlyOwnRidePosts { get; set; }

    public int? SourceId { get; set; }

    public int? DestinationId { get; set; }

    public double? MinPrice { get; set; }

    public double? MaxPrice { get; set; }

    public DateTimeOffset? DepartureStartDateTime { get; set; }

    public DateTimeOffset? DepartureEndDateTime { get; set; }

    public int? MinSeats { get; set; }

    public int? MaxSeats { get; set; }

    public string? AuthorName { get; set; }

    public string? AuthorPhoneNumber { get; set; }

    public string? AuthorComment { get; set; }

    // Sorting
    public string? Sort { get; set; } = SortingOptions.Default;

    // Pagination
    public int Page { get; set; } = 1;

    [Range(1, int.MaxValue)]
    public int PageSize { get; set; } = 20;
}