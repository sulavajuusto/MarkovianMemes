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
namespace MarkovBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        [Route("google-login")]
        [HttpPost]
        public async Task<IActionResult> GoogleLogin([FromBody] string idToken)
        {
            try {
                Console.Write(idToken);
                await GoogleJsonWebSignature.ValidateAsync(idToken);
                return Ok("Authentication succesful");
            }
            catch {
                return Problem("Authentication Failure with token " + idToken);
            }
        }
    }
}