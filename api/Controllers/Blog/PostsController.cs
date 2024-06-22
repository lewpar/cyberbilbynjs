using CyberBilbyApi.Controllers.Blog.Models;
using CyberBilbyApi.Database;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CyberBilby.Controllers.Blog;

[ApiController]
[Route("api/blog/posts")]
[EnableCors("MyCorsPolicy")]
public class PostsController : Controller
{
    private readonly CyberBilbyDbContext dbContext;

    public PostsController(CyberBilbyDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<IActionResult> GetAsync()
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