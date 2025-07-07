using Carpool.BLL.Intefaces;
using Carpool.BLL.Mappers;
using Carpool.Contracts.DTOs;
using Carpool.DAL.Interfaces;

namespace Carpool.BLL.Services;

public class LocalityService(IUnitOfWork unitOfWork) : ILocalityService
{
    private readonly IUnitOfWork _unitOfwork = unitOfWork;
    public async Task<IEnumerable<LocalityFullDto>> GetAllAsync()
    {
        var localities = await _unitOfwork.Localities.GetAllAsync();

        return localities.Select(i => i.ToFullDto());
    }
}
