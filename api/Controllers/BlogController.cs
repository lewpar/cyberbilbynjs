using CyberBilbyApi.Controllers.Models;
using CyberBilbyApi.Controllers.Response;
using CyberBilbyApi.Database;
using CyberBilbyApi.Database.Tables;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.IdentityModel.Tokens.Jwt;

namespace CyberBilbyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowReactFrontend")]
public class BlogController : Controller
{
    private readonly CyberBilbyDbContext dbContext;

    public BlogController(CyberBilbyDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [Authorize(Roles = "User,Author,Administrator")]
    [HttpGet("list")]
    [Produces("application/json")]
    public async Task<IActionResult> ListPostsAsync()
    {
        var user = User;
        var posts = await dbContext.Posts.Include(p => p.Author).ToListAsync();

        var mapped = posts.Select(post =>
        {
            return new BlogPostDto()
            {
                Title = post.Title ?? "Untitled",
                ShortContent = post.ShortContent ?? string.Empty,
                Content = post.Content ?? string.Empty,
                Author = post.Author?.DisplayName ?? "Anonymous"
            };
        }).ToList();

        return Json(mapped);
    }

    [Authorize(Roles = "Author,Administrator")]
    [HttpPost("create")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<IActionResult> CreatePostAsync([FromBody] CreateBlogPostDto post)
    {
        if (post is null)
        {
            return BadRequest(new BasicApiResponse(false, "You need to supply a post to create."));
        }

        if (string.IsNullOrEmpty(post.Title))
        {
            return BadRequest(new BasicApiResponse(false, "You need to supply a title."));
        }

        if (string.IsNullOrEmpty(post.ShortContent))
        {
            return BadRequest(new BasicApiResponse(false, "You need to supply short content."));
        }

        if (string.IsNullOrEmpty(post.Content))
        {
            return BadRequest(new BasicApiResponse(false, "You need to supply content."));
        }

        var userIdClaim = User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub);
        if (userIdClaim is null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return BadRequest(new BasicApiResponse(false, "Invalid session."));
        }

        var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user is null)
        {
            return BadRequest(new BasicApiResponse(false, "Invalid session."));
        }

        await dbContext.Posts.AddAsync(new Post()
        {
            Title = post.Title,
            ShortContent = post.ShortContent,
            Content = post.Content,
            Author = user
        });

        var result = await dbContext.SaveChangesAsync();

        if (result < 1)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new BasicApiResponse(false, "An internal error occured, post not created."));
        }

        return Ok(new BasicApiResponse(true, "Post created."));
    }
}