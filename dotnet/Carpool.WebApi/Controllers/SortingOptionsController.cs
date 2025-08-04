using Carpool.Shared.RidePostQueryOptions;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SortingOptionsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(SortingOptions.AllValueLabelPairs);
        }
    }
}
