using System.Security.Claims;
using Carpool.BLL.Intefaces;
using Carpool.Contracts.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RideRolesController(IRideRoleService rideRoleService) : ControllerBase
{
    private readonly IRideRoleService _rideRoleService = rideRoleService;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var rideRoles = await _rideRoleService.GetAllAsync();
        return Ok(rideRoles);
    }
}
