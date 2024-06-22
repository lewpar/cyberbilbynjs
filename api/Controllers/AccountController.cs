using CyberBilbyApi.Controllers.Models;
using CyberBilbyApi.Controllers.Response;
using CyberBilbyApi.Database;
using CyberBilbyApi.Database.Tables;
using CyberBilbyApi.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Text.Json;

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
    public async Task<IActionResult> CreateAccountAsync([FromBody]RegisterAccountDto account)
    {
        if(account is null)
        {
            return BadRequest(new BasicApiResponse(false, "You must supply a user to be created."));
        }

        if(string.IsNullOrWhiteSpace(account.DisplayName))
        {
            return BadRequest(new BasicApiResponse(false, "You must supply a display name."));
        }

        if(string.IsNullOrWhiteSpace(account.Username))
        {
            return BadRequest(new BasicApiResponse(false, "You must supply a username."));
        }

        if (string.IsNullOrWhiteSpace(account.Password))
        {
            return BadRequest(new BasicApiResponse(false, "You must supply a password."));
        }

        if (string.IsNullOrWhiteSpace(account.ConfirmPassword))
        {
            return BadRequest(new BasicApiResponse(false, "You must supply a confirmation password."));
        }

        if (account.Password != account.ConfirmPassword)
        {
            return BadRequest(new BasicApiResponse(false, "Your passwords do not match."));
        }

        var existingUser = await dbContext.Users.FirstOrDefaultAsync(u => string.Equals(u.Username, account.Username.ToLower()));
        if(existingUser is not null)
        {
            return BadRequest(new BasicApiResponse(false, "Username already taken."));
        }

        await dbContext.AddAsync(new User()
        {
            DisplayName = account.DisplayName,
            Username = account.Username.ToLower(),
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
    public async Task<IActionResult> LoginAsync([FromBody]LoginAccountDto account)
    {
        if (string.IsNullOrWhiteSpace(account.Username))
        {
            return BadRequest(new BasicApiResponse(false, "You must supply a username."));
        }

        if (string.IsNullOrWhiteSpace(account.Password))
        {
            return BadRequest(new BasicApiResponse(false, "You must supply a password."));
        }

        var user = await dbContext.Users.FirstOrDefaultAsync(u => string.Equals(u.Username, account.Username.ToLower()));
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
            HttpOnly = false, // TODO: Implement CSRF token
            Secure = false, // Production will use reverse proxy
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddMinutes(120)
        };
        Response.Cookies.Append("jwt", token, jwtCookie);

        return Ok(new BasicApiResponse(true, "Logged in."));
    }
}
