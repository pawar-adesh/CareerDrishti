using CareerDrishti.Data;
using CareerDrishti.Models;
using Microsoft.AspNetCore.Mvc;

namespace CareerDrishti.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentTestController : Controller
    {
        private readonly CareerDbContext _context;

        public StudentTestController(CareerDbContext studentTestContext)
        {
            _context = studentTestContext;
        }
        [HttpPost("addTestMarks")]
        public IActionResult AddTestDetails([FromBody] StudentTest studentTestObj)
        {
            if (studentTestObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.StudentTest.Add(studentTestObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Student marks Added Successfully"
                });
            }
        }
        [HttpGet("testDetails")]
        public IActionResult GetTestDetails()
        {
            var testDetails = _context.StudentTest.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                StudentTestDetails = testDetails.ToList()
            });
        }
    }
}
