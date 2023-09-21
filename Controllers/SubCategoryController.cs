using ecommercewebsite.Services;
using Microsoft.AspNetCore.Mvc;
using ecommercewebsite.Models;
using Microsoft.AspNetCore.Http;

namespace ecommercewebsite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SubCategoryController : ControllerBase
    {
        private readonly DatabaseServices _databaseServices;
        public SubCategoryController(DatabaseServices databaseServices)
        {
            _databaseServices = databaseServices;
        }
        //Tüm kategorileri getirme
        [HttpGet]
        public async Task<List<SubCategory>> Get() =>
         await _databaseServices.GetAsyncsub();
        //Kategori ve Alt Kategori Join Listini Getirme
        [HttpGet("subcategories")]
        public async Task<ActionResult<IEnumerable<object>>> GetCategoriesWithSubcategories()
        {
            var results = await _databaseServices.GetCategoriesWithSubcategories();
            return results;
        }
        //Tekli kategori getirme
        [HttpGet("{id}")]
        public async Task<ActionResult<SubCategory>> Get(int id)
        {
            var subcategory = await _databaseServices.GetAsyncsubwid(id);

            if (subcategory is null)
            {
                return NotFound();
            }

            return subcategory;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] SubCategory updatesubcategory, int id)
        {
            var subcategory = await _databaseServices.GetAsyncsubwid(id);
            if (subcategory is null)
            {
                return NotFound();
            }
            var status = updatesubcategory.Status;
            if (status == null)
            {
                _databaseServices.Updatesub(id, updatesubcategory);
            }
            else if (status != null)
            {
                _databaseServices.Updatesubcategorystatus(id, updatesubcategory);
            }
          

            return CreatedAtAction(nameof(Get), new { id = updatesubcategory.SubCategory_Id }, updatesubcategory);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SubCategory subcategory)
        {
            await _databaseServices.CreateSub(subcategory);
            return CreatedAtAction(nameof(Get), new { id = subcategory.Id }, subcategory);
        }
        //Tekli kategori silme
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var subcategory = await _databaseServices.GetAsyncsubwid(id);
            if (subcategory is null)
            {
                return NotFound();
            }

            await _databaseServices.Removesub(id);

            return NoContent();
        }
        //Toplu kategori getirme
        [HttpGet("sub/{id}")]
        public async Task<List<SubCategory>> Get2(int id)
        {
            var subcategory = await _databaseServices.GetAsyncsubwid2(id);

            if (subcategory is null)
            {
                return subcategory;
            }

            return subcategory;
        }
        //Toplu kategori silme
        [HttpDelete("sub/{id}")]
        public async Task<IActionResult> Delete2(int id)
        {
            var subcategory = await _databaseServices.GetAsyncsubwid2(id);
            if (subcategory is null)
            {
                return NotFound();
            }

            await _databaseServices.Removesub2(id);

            return NoContent();
        }
    }
}
