using CyberBilbyApi.Controllers.Models;
using CyberBilbyApi.Controllers.Response;
using CyberBilbyApi.Database;
using CyberBilbyApi.Database.Tables;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CyberBilbyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableCors("MyCorsPolicy")]
public class AccountController : Controller
{
    private readonly CyberBilbyDbContext dbContext;

    public AccountController(CyberBilbyDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateAccountAsync([FromBody]RegisterUserDto user)
    {
        if(user is null)
        {
            return BadRequest(new BasicApiResponse(false, "You must supply a user to be created."));
        }

        if(string.IsNullOrWhiteSpace(user.DisplayName))
        {
            return BadRequest(new BasicApiResponse(false, "You must supply a display name."));
        }

        if(string.IsNullOrWhiteSpace(user.Username))
        {
            return BadRequest(new BasicApiResponse(false, "You must supply a username."));
        }

        if (string.IsNullOrWhiteSpace(user.Password))
        {
            return BadRequest(new BasicApiResponse(false, "You must supply a password."));
        }

        if (string.IsNullOrWhiteSpace(user.ConfirmPassword))
        {
            return BadRequest(new BasicApiResponse(false, "You must supply a confirmation password."));
        }

        if (user.Password != user.ConfirmPassword)
        {
            return BadRequest(new BasicApiResponse(false, "Your passwords do not match."));
        }

        var existingUser = await dbContext.Users.FirstOrDefaultAsync(u => string.Equals(u.Username, user.Username.ToLower()));
        if(existingUser is not null)
        {
            return BadRequest(new BasicApiResponse(false, "Username already taken."));
        }

        await dbContext.AddAsync(new User()
        {
            DisplayName = user.DisplayName,
            Username = user.Username.ToLower(),
            Password = BCrypt.Net.BCrypt.HashPassword(user.Password)
        });

        var result = await dbContext.SaveChangesAsync();

        if(result < 1)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new BasicApiResponse(false, "Account not created, an internal server error occured."));
        }

        return Ok(new BasicApiResponse(true, "Account created."));
    }
}
