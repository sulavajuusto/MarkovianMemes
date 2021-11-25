using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Logging.Debug;

namespace MarkovBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        [Route("google-login")]
        [HttpPost]
        public async Task<IActionResult> GoogleLogin(string idToken)
        {
            try {
                await GoogleJsonWebSignature.ValidateAsync(idToken);
                return Ok("Authentication succesful");
            }
            catch {
                return Problem("Authentication Failure with token " + idToken);
            }
        }
    }
}