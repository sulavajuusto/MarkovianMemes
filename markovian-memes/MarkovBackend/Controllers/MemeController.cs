using MarkovBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
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
        private readonly MemeContext _context;

        public MemeController(MemeContext context)
        {
            _context = context;
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

            _context.Memes.Add(result);
            await _context.SaveChangesAsync();

            return Ok(result);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetMeme(int id)
        {
            Meme meme = await _context.Memes.Where(x => x.MemeId == id).Include(x => x.Comments).Include(x => x.Upvotes).FirstOrDefaultAsync();

            if (meme == null)
            {
                return NotFound();
            }

            return Ok(meme);
        }

        

        [HttpPost("/Save/{memeId}/{userId}")]
        public async Task<ActionResult<User>> SaveMeme(int memeId, int userId)
        {
            
            Meme meme = await _context.Memes.FirstOrDefaultAsync(x => x.MemeId == memeId);
            User user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            if (meme == null || user == null)
            {
                return NotFound();
            }

            SavedMeme savedMeme = new SavedMeme();

            savedMeme.UserId = userId;
            savedMeme.MemeId = memeId;
            savedMeme.TimeStamp = DateTime.Now;

            _context.SavedMemes.Add(savedMeme);

            await _context.SaveChangesAsync();

            return Ok(savedMeme);
        }

        [HttpPost("/Upvote/{memeId}/{userId}")]
        public async Task<ActionResult<User>> Upvote(int memeId, int userId)
        {
            Meme meme = await _context.Memes.FirstOrDefaultAsync(x => x.MemeId == memeId);
            User user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            if (meme == null || user == null)
            {
                return NotFound();
            }

            Upvote downvote = new Upvote();

            downvote.UserId = userId;
            downvote.MemeId = userId;
            downvote.TimeStamp = DateTime.Now;
            downvote.UserId = userId;

            _context.Upvotes.Add(downvote);

            await _context.SaveChangesAsync();

            return Ok(downvote);
        }
    }
}
