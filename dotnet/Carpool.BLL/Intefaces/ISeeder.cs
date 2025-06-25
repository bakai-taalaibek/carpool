using Carpool.Contracts.DTOs;

namespace Carpool.BLL.Intefaces;

public interface ISeeder
{
    Task SeedLocalitiesAsync(IEnumerable<LocalitySeedDto> localities);
}
