using Application.DTOs;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers.v1
{
    [Route("api/v1/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IAuthManager _authManager;
        public AuthController(IAuthManager authManager)
        {
            _authManager = authManager;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            var result = await _authManager.VerifyUser(loginDto);
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return NotFound(result.Message);

        }
    }
}
