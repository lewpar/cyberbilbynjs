using CyberBilbyApi.Controllers.Filters;
using CyberBilbyApi.Controllers.Models.Request;
using CyberBilbyApi.Controllers.Response;
using CyberBilbyApi.Database;
using CyberBilbyApi.Database.Tables;
using CyberBilbyApi.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Security.Claims;

namespace CyberBilbyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowReactFrontend")]
public class AccountController : Controller
{
    private readonly CyberBilbyDbContext dbContext;
    private readonly JwtService jwtService;

    public AccountController(CyberBilbyDbContext dbContext, JwtService jwtService)
    {
        this.dbContext = dbContext;
        this.jwtService = jwtService;
    }

    [AllowAnonymous]
    [HttpPost("create")]
    [Consumes("application/json")]
    [Produces("application/json")]
    [InputValidationActionFilter]
    public async Task<IActionResult> CreateAccountAsync([FromBody]RegisterAccountDto account)
    {
        if (account.Password != account.ConfirmPassword)
        {
            return BadRequest(new BasicApiResponse(false, "Your passwords do not match."));
        }

        var existingUser = await dbContext.Users.FirstOrDefaultAsync(u => string.Equals(u.Username, account.Username!.ToLower()));
        if(existingUser is not null)
        {
            return BadRequest(new BasicApiResponse(false, "Username already taken."));
        }

        await dbContext.AddAsync(new User()
        {
            DisplayName = account.DisplayName,
            Username = account.Username!.ToLower(),
            Password = BCrypt.Net.BCrypt.HashPassword(account.Password),
            Role = UserRole.User
        });

        var result = await dbContext.SaveChangesAsync();

        if(result < 1)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new BasicApiResponse(false, "Account not created, an internal server error occured."));
        }

        return Ok(new BasicApiResponse(true, "Account created."));
    }

    [AllowAnonymous]
    [HttpPost("login")]
    [Consumes("application/json")]
    [Produces("application/json")]
    [InputValidationActionFilter]
    public async Task<IActionResult> LoginAsync([FromBody]LoginAccountDto account)
    {
        var user = await dbContext.Users.FirstOrDefaultAsync(u => string.Equals(u.Username, account.Username!.ToLower()));
        if(user is null)
        {
            return BadRequest(new BasicApiResponse(false, "Invalid username or password."));
        }

        var validPassword = BCrypt.Net.BCrypt.Verify(account.Password, user.Password);
        if(!validPassword)
        {
            return BadRequest(new BasicApiResponse(false, "Invalid username or password."));
        }

        var token = jwtService.GenerateJwt(user);

        var jwtCookie = new CookieOptions
        {
            HttpOnly = true,
            Secure = false, // Production will use reverse proxy
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddMinutes(120)
        };
        Response.Cookies.Append("jwt", token, jwtCookie);

        return Ok(new BasicApiResponse(true, "Logged in."));
    }

    [Authorize]
    [HttpGet("logout")]
    [Produces("application/json")]
    public async Task<IActionResult> LogoutAsync()
    {
        var jwtCookie = new CookieOptions
        {
            HttpOnly = true,
            Secure = false, // Production will use reverse proxy
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddDays(-1)
        };
        Response.Cookies.Append("jwt", "", jwtCookie);

        return Ok(new BasicApiResponse(true, "Logged out."));
    }

    [Authorize]
    [HttpGet("whoami")]
    [Produces("application/json")]
    public async Task<IActionResult> WhoAmIAsync()
    {
        var userIdClaim = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        if(userIdClaim is null)
        {
            return BadRequest(new BasicApiResponse(false, "Invalid session."));
        }

        if (!int.TryParse(userIdClaim.Value, out int userId))
        {
            return BadRequest(new BasicApiResponse(false, "Invalid session. Parse failed."));
        }

        var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user is null)
        {
            return BadRequest(new BasicApiResponse(false, "Invalid session."));
        }

        return Ok(new WhoAmIResponse(true, "")
        {
            Role = user.Role.ToString(),
            IsLoggedIn = true,
            DisplayName = user.DisplayName
        });
    }
}
