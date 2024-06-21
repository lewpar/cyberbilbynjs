using CyberBilbyApi.Controllers.Models;
using CyberBilbyApi.Controllers.Response;
using CyberBilbyApi.Database;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace CyberBilbyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowReactFrontend")]
public class AuthController : Controller
{
    private readonly CyberBilbyDbContext dbContext;

    public AuthController(CyberBilbyDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [Authorize]
    [HttpPost("route")]
    public async Task<IActionResult> IsRouteAuthorizedAsync([FromBody] RouteAuthorizedDto data)
    {
        if (data is null)
        {
            return BadRequest(new BasicApiResponse(false, "You must supply a route."));
        }

        if (string.IsNullOrWhiteSpace(data.Route))
        {
            return BadRequest(new BasicApiResponse(false, "You must supply a route."));
        }

        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub);
        if (userIdClaim is null || int.TryParse(userIdClaim.Value, out int userId))
        {
            return BadRequest(new BasicApiResponse(false, "Invalid user id in session token."));
        }

        var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if(user is null)
        {
            return BadRequest(new BasicApiResponse(false, "Invalid user id in session token."));
        }

        var result = await dbContext.RoleAccess.FirstOrDefaultAsync(r => r.UserRole == user.Role && r.Route == data.Route.ToLower());
        if(result is null)
        {
            return BadRequest(new BasicApiResponse(false, "You are not authorized to access this route."));
        }

        return Ok(new BasicApiResponse(true, "Route authorized."));
    }
}
