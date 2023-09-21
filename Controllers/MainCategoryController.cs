using ecommercewebsite.Services;
using Microsoft.AspNetCore.Mvc;
using ecommercewebsite.Models;
namespace ecommercewebsite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MainCategoryController : ControllerBase
    {
        private readonly DatabaseServices _services;
        public MainCategoryController(DatabaseServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<List<MainCategory>> Get() =>
        await _services.GetAsyncmain();
        [HttpGet("{id}")]
        public async Task<ActionResult<MainCategory>> Get(int id)
        {
            var category = await _services.GetAsync(id);

            if (category is null)
            {
                return NotFound();
            }

            return category;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MainCategory category)
        {
            await _services.CreateAsync(category);
            return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] MainCategory updatecategory, int id)
        {
            var category = await _services.GetAsync(id);
            if (category is null)
            {
                return NotFound();
            }
            var status = updatecategory.Status;
            if (status == null)
            {
                _services.Update(id, updatecategory);
            }
            else if (status != null)
            {
                _services.Updatemaincategorystatus(id, updatecategory);
            }
           

            return CreatedAtAction(nameof(Get), new { id = updatecategory.Categorycode }, updatecategory);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _services.GetAsync(id);
            if (category is null)
            {
                return NotFound();
            }

            await _services.Remove(id);

            return NoContent();
        }
    }
}
