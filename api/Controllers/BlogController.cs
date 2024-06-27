using CyberBilbyApi.Controllers.Filters;
using CyberBilbyApi.Controllers.Models.Request;
using CyberBilbyApi.Controllers.Models.Response;
using CyberBilbyApi.Controllers.Response;
using CyberBilbyApi.Database;
using CyberBilbyApi.Database.Tables;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

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

    [AllowAnonymous]
    [HttpGet("list")]
    [Produces("application/json")]
    public async Task<IActionResult> ListPostsAsync()
    {
        var posts = await dbContext.Posts.Include(p => p.Author).ToListAsync();

        var mapped = posts.Select(post =>
        {
            return new BlogPostDto()
            {
                Title = post.Title ?? "Untitled",
                Slug = post.Slug ?? string.Empty,
                ShortContent = post.ShortContent ?? string.Empty,
                Content = post.Content ?? string.Empty,
                Author = post.Author?.DisplayName ?? "Anonymous"
            };
        }).ToList();

        return Json(mapped);
    }

    [AllowAnonymous]
    [HttpGet("post/{slug}")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public async Task<IActionResult> GetPostBySlugAsync(string? slug)
    {
        var post = await dbContext.Posts.FirstOrDefaultAsync(p => p.Slug == slug);

        if(post is null)
        {
            return BadRequest(new BasicApiResponse(false, "No post found with that slug."));
        }

        return Json(new BlogPostDto()
        {
            Title = post.Title ?? "Untitled",
            Slug = post.Slug ?? string.Empty,
            ShortContent = post.ShortContent ?? string.Empty,
            Content = post.Content ?? string.Empty,
            Author = post.Author?.DisplayName ?? "Anonymous"
        });
    }

    [Authorize(Roles = "Author,Administrator")]
    [HttpPost("create")]
    [Consumes("application/json")]
    [Produces("application/json")]
    [InputValidationActionFilter]
    public async Task<IActionResult> CreatePostAsync([FromBody] CreateBlogPostDto post)
    {
        var userIdClaim = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
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
            Slug = post.Slug,
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