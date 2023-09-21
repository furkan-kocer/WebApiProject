using ecommercewebsite.Models;
using ecommercewebsite.Services;
using Microsoft.AspNetCore.Mvc;

namespace ecommercewebsite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginAdminPanelController : ControllerBase
    {
        private readonly DatabaseServices _databaseServices;
        public LoginAdminPanelController(DatabaseServices databaseServices) { 
        _databaseServices= databaseServices;
        }

        [HttpGet]
        public async Task<List<AdminLogin>> Get() =>
        await _databaseServices.GetAsync();
    }
}
