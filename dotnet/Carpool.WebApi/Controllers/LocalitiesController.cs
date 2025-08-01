using Carpool.BLL.Intefaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocalitiesController(ILocalityService localityService) : ControllerBase
    {
        private readonly ILocalityService _localityService = localityService;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var localities = await _localityService.GetAllAsync();
            return Ok(localities);
        }
    }
}
