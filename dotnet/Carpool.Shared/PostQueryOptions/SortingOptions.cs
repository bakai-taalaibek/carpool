namespace Carpool.Shared.PostQueryOptions;

public static class SortingOptions
{
    public const string Newest = "newest";
    
    public const string Oldest = "oldest";
    
    public const string Cheapest = "cheapest";
    
    public const string MostExpensive = "mostExpensive";

    public static string Default { get; } = Newest;

    public static List<string> ToList() =>
    [
        Newest,
        Oldest,
        Cheapest,
        MostExpensive
    ];
}
