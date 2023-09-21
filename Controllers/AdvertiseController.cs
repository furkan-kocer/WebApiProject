using ecommercewebsite.Services;
using Microsoft.AspNetCore.Mvc;
using ecommercewebsite.Models;
namespace ecommercewebsite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdvertiseController : ControllerBase
    {
        private readonly DatabaseServices _databaseServices;
        public AdvertiseController(DatabaseServices databaseServices)
        {
            _databaseServices = databaseServices;
        }
        [HttpGet]
        public async Task<List<Advertise>> Get() =>
            await _databaseServices.GetAsyncadvertise();
        [HttpGet("{id}")]
        public async Task<ActionResult<Advertise>> Get(int id)
        {
            var advertise = await _databaseServices.GetAsyncadvertise(id);

            if (advertise is null)
            {
                return NotFound();
            }

            return advertise;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Advertise advertise)
        {
            await _databaseServices.CreateAdvertise(advertise);
            return CreatedAtAction(nameof(Get), new { id = advertise.Id }, advertise);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] Advertise updateadvertise, int id)
        {
            var advertise = await _databaseServices.GetAsyncadvertise(id);
            if (advertise is null)
            {
                return NotFound();
            }
            var status = updateadvertise.Status;
            if (status == null)
            {
                _databaseServices.UpdateAdvertise(id, updateadvertise);
            }
            else if (status != null)
            {
                _databaseServices.Updateadvertisestatus(id, updateadvertise);
            }
           

            return CreatedAtAction(nameof(Get), new { id = updateadvertise.Advertise_Id }, updateadvertise);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var advertise = await _databaseServices.GetAsyncadvertise(id);
            if (advertise is null)
            {
                return NotFound();
            }

            await _databaseServices.Removeadvertise(id);

            return NoContent();
        }
    }
}
