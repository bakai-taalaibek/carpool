using Carpool.BLL.Intefaces;
using Carpool.BLL.Mappers;
using Carpool.Contracts.DTOs;
using Carpool.DAL.Interfaces;
using Carpool.Entities;

namespace Carpool.BLL.Services;

public class LocalityService(IUnitOfWork unitOfWork) : ILocalityService
{
    private readonly IUnitOfWork _unitOfwork = unitOfWork;
    public async Task<IEnumerable<LocalityFullDto>> GetAllAsync()
    {
        List<Locality> localities = (List<Locality>)(await _unitOfwork.Localities.GetAllAsync());

        return localities.OrderByDescending(l => l.Population).Select(i => i.ToFullDto());
    }
}
