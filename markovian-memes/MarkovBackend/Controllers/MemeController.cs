using MarkovBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarkovBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MemeController : ControllerBase
    {
        
        private readonly ILogger<MemeController> _logger;

        public MemeController(ILogger<MemeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult>  GetMeme()
        {
            var result = new Meme();


            result.Data = null; //tähän kuvangenerointi

            return Ok(result);

        }
    }
}
