using CareerDrishti.Data;
using CareerDrishti.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CareerDrishti.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly CareerDbContext _context;

        public AdminController(CareerDbContext adminDbContext)
        {
            _context = adminDbContext;
        }

        [HttpGet("admin")]
        public IActionResult GetAdminDetails()
        {
            var adminDetails = _context.Admin.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                adminCreds = adminDetails.ToList()
            }); 
        }
    }
}
