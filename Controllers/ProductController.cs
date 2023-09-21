using ecommercewebsite.Services;
using Microsoft.AspNetCore.Mvc;
using ecommercewebsite.Models;
using MongoDB.Driver.Core.Events;

namespace ecommercewebsite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly DatabaseServices _databaseServices;
        public ProductController(DatabaseServices databaseServices) { 
            _databaseServices= databaseServices;
        }
        [HttpGet]
        public async Task<List<Product>> Get() =>
            await _databaseServices.GetAsyncproduct();
        [HttpGet("uiproduct")]
        public async Task<List<Product>> Getuiproduct() =>
            await _databaseServices.GetAsyncproductforusers();
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var product = await _databaseServices.GetAsyncproduct(id);

            if (product is null)
            {
                return NotFound();
            }

            return product;
        }
        [HttpGet("category/{id}")]
        public async Task<IActionResult> GetwCategory(int id)
        {
            var category = await _databaseServices.GetAsync(id);  
            if(category is null)
            {
                return NotFound("Category not found.");
            }
            else
            {
                var product = await _databaseServices.GetAsyncproductwcategory(id);
                if (product is null)
                {
                    return null;
                }
                return Ok(product);
            }
            
        }
        [HttpGet("subcategory/{id}")]
        public async Task<IActionResult> GetwSub(int id)
        {
            var subcategory = await _databaseServices.GetAsyncsubwid(id);
            if (subcategory is null)
            {
                return NotFound("Subcategory not found.");
            }
            else
            {
                var product = await _databaseServices.GetAsyncproductwsub(id);
                if (product is null)
                {
                    return NotFound("Product not found.");
                }
                return Ok(product);
            }

        }

        [HttpGet("search")]
        public async Task<List<Product>> GetwSearch(string query)
        {
            var search = await _databaseServices.Searchproducts(query);
            if (search is null)
            {
                return null;
            }
            return search;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Product product)
        {
              await _databaseServices.CreateProduct(product);
            if(product.Id != null)
            {
                return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] Product updateproduct, int id)
        {
            var product = await _databaseServices.GetAsyncproduct(id);
            if (product is null)
            {
                return NotFound();
            }
            var status = updateproduct.Status;
            if(status == null)
            {
                _databaseServices.Updateproduct(id, updateproduct);
            }
           else if(status != null)
            {
                _databaseServices.Updateproductstatus(id, updateproduct);
            }

            return CreatedAtAction(nameof(Get), new { id = updateproduct.Product_Id }, updateproduct);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _databaseServices.GetAsyncproduct(id);
            if (product is null)
            {
                return NotFound();
            }

            await _databaseServices.Removeproduct(id);

            return NoContent();
        }
    }
}
