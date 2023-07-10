using CareerDrishti.Data;
using CareerDrishti.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CareerDrishti.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly CareerDbContext _context;

        public QuestionsController(CareerDbContext quecontext)
        {
            _context = quecontext;
        }

        [HttpPost("addQue")]
            public IActionResult AddQuestion([FromBody] Questions queObj)
        {
            if(queObj == null)
            {
                return BadRequest();
            }
            else
            {
                queObj.quetsionID = Guid.NewGuid().ToString();
                _context.Questions.Add(queObj); 
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Question Added Successfully"
                });
            }
        }

        [HttpPut("updateQue")]
        public IActionResult UpdateQuestion([FromBody] Questions queObj) { 
            if(queObj== null) {
                return BadRequest();
            }
            else
            {
                var question = _context.Questions.AsNoTracking().FirstOrDefault(x => x.quetsionID == queObj.quetsionID);
                if (question == null)
                {
                    return NotFound(new
                    {
                        StatusCode = 404,
                        Message = "question Not Found"
                    }); ;
                }
                else
                {
                    _context.Entry(queObj).State = EntityState.Modified;
                    _context.SaveChanges();
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Question updated Successfully"
                    });
                }
            }
        }

        [HttpDelete("delQue/{id}")]
        public IActionResult DeleteQuestion(String id)
        {
            var question = _context.Questions.Find(id);
            if (question == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "Question Not Found"
                });
            }
            else
            {
                _context.Remove(question);
                _context.SaveChanges();
                return Ok(new
                {
                    StausCode = 200,
                    Message = "Question Deleted"
                });
            }
        }


        [HttpGet("getAllQues")]
        public IActionResult getAllQuestions()
        {
            var allQuestions = _context.Questions.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                QuestionDetails = allQuestions.ToList()
            });
        }

    }
}
