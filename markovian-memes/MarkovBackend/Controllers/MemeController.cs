using MarkovBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

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
            using (StreamReader r = new StreamReader("Generator/starts.json"))
            {
                string json = r.ReadToEnd();
                string[] lines = JsonConvert.DeserializeObject<string[]>(json);
                var model = new MarkovSharp.TokenisationStrategies.StringMarkov(1);
                model.Learn(lines);
                result.Data = null; //tähän kuvangenerointi
                result.MemeText = model.Walk().First(); 
            }
            using (StreamReader r = new StreamReader("Generator/ends.json"))
            {
                string json = r.ReadToEnd();
                string[] lines = JsonConvert.DeserializeObject<string[]>(json);
                var model = new MarkovSharp.TokenisationStrategies.StringMarkov(1);
                model.Learn(lines);
                result.Data = null; //tähän kuvangenerointi
                result.MemeText += "\n" + model.Walk().First(); 
            }
            return Ok(result);

        }
    }
}
