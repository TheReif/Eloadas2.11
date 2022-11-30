using Eloadas2._11.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Eloadas2._11.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class BoatController : ControllerBase
    {
        [HttpGet]
        //[Route("hajo/kerdesek")]
        [Route("questions/all")]
        public IActionResult fv1()
        {
            HajosContext hajosContext = new Models.HajosContext();
            var lisa = from x in hajosContext.Questions
                       select x.Question1;
            return Ok(lisa);
        }

        [HttpGet]
        [Route("hajo/kerdesek/{id}")]
        public IActionResult fv2(int id)
        {
            HajosContext hajosContext = new HajosContext();
            var lisa = from x in hajosContext.Questions
                       where x.QuestionId == id
                       select x;
           


            var lisa2 = hajosContext.Questions.Where(x => x.QuestionId == id);
            return Ok(lisa.FirstOrDefault());
        }
    }
}
