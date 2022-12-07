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
        [Route("questions/{sorszám}")]
        public IActionResult fv2(int sorszám)
        {
            HajosContext hajosContext = new HajosContext();
            var lisa = (from x in hajosContext.Questions
                        where x.QuestionId == sorszám
                        select x).FirstOrDefault();


            if (lisa == null) return BadRequest("Nincs ilyen sorszámú kérdés");
            //var lisa2 = hajosContext.Questions.Where(x => x.QuestionId == id);
            return new JsonResult(lisa);
        }

        [HttpGet]
        [Route("questions/count")]
        public int M4()
        {
            HajosContext hjosContext = new HajosContext();
            int kérdésSzám= hjosContext.Questions.Count();
            return kérdésSzám;
        }

    }
}
