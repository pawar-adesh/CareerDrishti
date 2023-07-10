using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CareerDrishti.Data;
using CareerDrishti.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Data;

namespace CareerDrishti.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpHandlingController : ControllerBase
    {
        private readonly CareerDbContext _context;

        public SpHandlingController(CareerDbContext context)
        {
            _context = context;
        }

        // GET: api/QuestionField
        [HttpGet("getFields")]
        public async Task<ActionResult<IEnumerable<Questions>>> GetQuestions()
        {
            string StoredProc = "call spGetAllFields()";
            return await _context.Questions.FromSqlRaw(StoredProc).ToListAsync();
        }


    }
}
