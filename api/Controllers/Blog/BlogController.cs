using CyberBilbyApi.Controllers.Blog.Models;
using CyberBilbyApi.Database;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CyberBilby.Controllers.Blog;

[ApiController]
[Route("api/[controller]")]
[EnableCors("MyCorsPolicy")]
public class BlogController : Controller
{
    private readonly CyberBilbyDbContext dbContext;

    public BlogController(CyberBilbyDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpGet("/list")]
    public async Task<IActionResult> ListPostsAsync()
    {
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
}