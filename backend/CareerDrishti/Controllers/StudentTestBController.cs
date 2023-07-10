using CareerDrishti.Data;
using CareerDrishti.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CareerDrishti.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentTestBController : Controller
    {
        private readonly CareerDbContext _context;

        public StudentTestBController(CareerDbContext studentTestBContext)
        {
            _context = studentTestBContext;
        }
        [HttpPost("addTestMarks")]
        public IActionResult AddTestBDetails([FromBody] StudentTestB studentTestBObj)
        {
            if (studentTestBObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.StudentTestB.Add(studentTestBObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Student marks Added Successfully"
                });
            }
        }
        [HttpGet("testDetails")]
        public IActionResult GetTestBDetails()
        {
            var testDetails = _context.StudentTestB.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                StudentTestDetails = testDetails.ToList()
            });
        }
    }
}
