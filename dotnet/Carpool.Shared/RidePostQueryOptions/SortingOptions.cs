namespace Carpool.Shared.RidePostQueryOptions;

public record SortingOption(string Value, string Label);

public static class SortingOptions
{
    public const string Cheaper = "cheaper";
    public const string MoreExpensive = "moreExpensive";
    public const string Sooner = "sooner";
    public const string Later = "later";
    public const string FewerSeats = "fewerSeats";
    public const string MoreSeats = "moreSeats";

    public static string Default = Sooner;

    public static readonly SortingOption[] AllValueLabelPairs = [
        new (Sooner, "Выезд скоро"),
        new (Later, "Выезд потом"),
        new (Cheaper, "Дешевле"),
        new (MoreExpensive, "Дороже"),
        new (FewerSeats, "Меньше мест"),
        new (MoreSeats, "Больше мест")
    ];
}
