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
                result.Data = null;
                string text = model.Walk().First();
                while (text.Length > 60) {
                    text = model.Walk().First();
                }
                result.MemeText = text;
            }
            using (StreamReader r = new StreamReader("Generator/ends.json"))
            {
                string json = r.ReadToEnd();
                string[] lines = JsonConvert.DeserializeObject<string[]>(json);
                var model = new MarkovSharp.TokenisationStrategies.StringMarkov(1);
                model.Learn(lines);
                string text = model.Walk().First();
                while (text.Length > 60) {
                    text = model.Walk().First();
                }
                result.MemeText += "\n" + text;
            }

            var rand = new Random();
            var files = Directory.GetFiles("Generator/Images/","*.jpg");
            result.Data = System.IO.File.ReadAllBytes(files[rand.Next(files.Length)]);

            return Ok(result);

        }
    }
}
