using Carpool.BLL.Intefaces;
using Carpool.Contracts.DTOs;
using Carpool.DAL.Interfaces;
using Carpool.Entities;
using Carpool.Shared.Helpers;

namespace Carpool.BLL.Services;

public class Seeder(IUnitOfWork unitOfWork) : ISeeder
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task SeedLocalitiesAsync(IEnumerable<LocalitySeedDto> localities)
    {
        // Add all entities to tracking at once to avoid multiple database calls
        await _unitOfWork.Countries.GetAllAsTrackingAsync();
        await _unitOfWork.Regions.GetAllAsTrackingAsync();
        await _unitOfWork.Districts.GetAllAsTrackingAsync();
        await _unitOfWork.Aimaks.GetAllAsTrackingAsync();
        await _unitOfWork.LocalityTypes.GetAllAsTrackingAsync();
        await _unitOfWork.Localities.GetAllAsTrackingAsync();

        foreach (var localityDto in localities)
        {
            var country = await _unitOfWork.Countries.EnsureTrackedAsync(localityDto.Country);
            var localityType = await _unitOfWork.LocalityTypes.EnsureTrackedAsync(localityDto.LocalityType);

            var locality = new Locality
            {
                Country = country,
                Name = localityDto.Locality,
                OldName = localityDto.OldName,
                SearchString = SearchStringBuilder.Build([
                    localityDto.Locality,
                    localityDto.OldName,
                    localityDto.AltNames ]),
                LocalityType = localityType,
                Population = localityDto.Population
            };

            if (!string.IsNullOrWhiteSpace(localityDto.Region))
            {
                var region = await _unitOfWork.Regions
                    .EnsureTrackedAsync(localityDto.Region, country);
                locality.Region = region;

                if (!string.IsNullOrWhiteSpace(localityDto.District))
                {
                    var district = await _unitOfWork.Districts
                        .EnsureTrackedAsync(localityDto.District, region);
                    locality.District = district;

                    if (!string.IsNullOrWhiteSpace(localityDto.Aimak))
                    {
                        var aimak = await _unitOfWork.Aimaks
                            .EnsureTrackedAsync(localityDto.Aimak, district);
                        locality.Aimak = aimak;
                    }
                }
            }

            await _unitOfWork.Localities.EnsureTrackedAsync(locality);
        }

        await _unitOfWork.SaveChangesAsync();
    }
}
