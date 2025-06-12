using System.Globalization;
using Carpool.Contracts.DTOs;
using CsvHelper;

namespace Carpool.WebApi.Helpers;

public class CsvLoader
{
    public static IEnumerable<LocalitySeedDto> LoadLocalities(string filePath)
    {
        using var reader = new StreamReader(filePath);
        using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
        return csv.GetRecords<LocalitySeedDto>().ToList();
    }
}
