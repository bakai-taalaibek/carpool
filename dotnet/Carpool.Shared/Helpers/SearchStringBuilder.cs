namespace Carpool.Shared.Helpers;

public static class SearchStringBuilder
{
    public static string Build(string?[] names)
    {
        if (names == null || names.Length == 0)
        {
            return string.Empty;
        }

        return string.Join("|", names.Where(n => !string.IsNullOrEmpty(n)).Select(Normalize));
    }

    public static string Normalize(string? name)
    {
        if (string.IsNullOrEmpty(name))
        {
            return string.Empty;
        }
        
        name = name.ToLowerInvariant();

        name = name
            .Replace("дж", "ж")
            .Replace('у', 'ү')
            .Replace('ю', 'ү')
            .Replace('е', 'ө')
            .Replace('о', 'ө')
            .Replace('ё', 'ө')
            .Replace(" ", "")
            .Replace("-", "");

        return name;
    }
}
