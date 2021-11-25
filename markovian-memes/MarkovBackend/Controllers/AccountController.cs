using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Logging.Debug;
using System;
using MarkovBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace MarkovBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : Controller
    {

        private readonly MemeContext _context;

        public AccountController(MemeContext context)
        {
            _context = context;
        }

        [Route("google-login")]
        [HttpPost]
        public async Task<IActionResult> GoogleLogin([FromBody] string idToken)
        {
            try {
                Console.Write(idToken);
                var jotain = await GoogleJsonWebSignature.ValidateAsync(idToken);
                string email = jotain.Email; 
                User user = await _context.Users.FirstOrDefaultAsync(e => e.Username == email);
                var time = DateTime.Now;
                if (user != null)
                {
                    return Ok(user.UserId);
                }
                else

                {

                    user = new User();

                    user.Username = email;

                    user.LastLogin = time;

                    _context.Users.Add(user);

                    await _context.SaveChangesAsync();

                }

                return CreatedAtAction("PostNewUserOrReturnId", user.UserId);
            }
            catch {
                return Problem("Authentication Failure with token " + idToken);
            }
        }

   
    }
}