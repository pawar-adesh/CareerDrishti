using CareerDrishti.Data;
using CareerDrishti.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CareerDrishti.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolController : ControllerBase
    {
        private readonly CareerDbContext _context;
        public SchoolController(CareerDbContext schoolContext)
        {
            _context = schoolContext;
        }

        [HttpPost("addSchool")]
        public IActionResult AddSchoolDetails([FromBody] School schoolObj)
        {
            if (schoolObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.School.Add(schoolObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "School details Added Successfully"
                });
            }
        }
        [HttpPut("updateSchool")]
        public IActionResult updateSchool([FromBody] School schoolObj)
        {
            if (schoolObj == null)
            {
                return BadRequest();
            }
            else
            {
                var sch = _context.School.AsNoTracking().FirstOrDefault(x => x.name == schoolObj.name);
                if (sch == null)
                {
                    return NotFound(new
                    {
                        StatusCode = 404,
                        Message = "School Not Found"
                    }); ;
                }
                else
                {
                    _context.Entry(schoolObj).State = EntityState.Modified;
                    _context.SaveChanges();
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "School updated Successfully"
                    });
                }
            }
        }

        [HttpDelete("delSchool/{name}")]
        public IActionResult DeleteStudent(string name)
        {
            var sch = _context.School.Find(name);
            if (sch == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "School Not Found"
                });
            }
            else
            {
                _context.Remove(sch);
                _context.SaveChanges();
                return Ok(new
                {
                    StausCode = 200,
                    Message = "School Deleted"
                });
            }
        }

        [HttpGet]
        public IActionResult GetSchoolDetails()
        {
            var schoolDetails = _context.School.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                SchoolDetails = schoolDetails.ToList()
            });
        }
    }
}
