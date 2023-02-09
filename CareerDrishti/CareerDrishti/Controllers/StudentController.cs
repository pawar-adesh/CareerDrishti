using CareerDrishti.Data;
using CareerDrishti.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CareerDrishti.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly CareerDbContext _context;

        public StudentController(CareerDbContext studentContext)
        {
            _context = studentContext;
        }
        [HttpPost("addStudent")]
        public IActionResult AddStudent([FromBody] Student studentObj)
        {
            if (studentObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.Student.Add(studentObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Student Added Successfully"
                });
            }
        }

        [HttpPut("updateStudent")]
        public IActionResult UpdateStudent([FromBody] Student studentObj)
        {
            if (studentObj == null)
            {
                return BadRequest();
            }
            else
            {
                var student = _context.Student.AsNoTracking().FirstOrDefault(x => x.email == studentObj.email);
                if (student == null)
                {
                    return NotFound(new
                    {
                        StatusCode = 404,
                        Message = "student Not Found"
                    }); ;
                }
                else
                {
                    _context.Entry(studentObj).State = EntityState.Modified;
                    _context.SaveChanges();
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Student updated Successfully"
                    });
                }
            }
        }

        [HttpDelete("delStudent/{email}")]
        public IActionResult DeleteStudent(string email)
        {
            var student = _context.Student.Find(email);
            if (student == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "Student Not Found"
                });
            }
            else
            {
                _context.Remove(student);
                _context.SaveChanges();
                return Ok(new
                {
                    StausCode = 200,
                    Message = "Student Deleted"
                });
            }
        }
        [HttpGet]
        public IActionResult GetStudents()
        {
            var studentDetails = _context.Student.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                StudentDetails = studentDetails.ToList()
            });
        }
    }
}
