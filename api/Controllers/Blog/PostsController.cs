using Microsoft.AspNetCore.Mvc;

using CyberBilby.Controllers.Blog.Models;
using Microsoft.AspNetCore.Cors;
using CyberBilbyApi.Database;
using Microsoft.EntityFrameworkCore;

namespace CyberBilby.Controllers.Blog
{
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
            var posts = await dbContext.Posts.ToListAsync();
            var mapped = new List<BlogPost>();

            foreach(var post in posts)
            {
                mapped.Add(new BlogPost(post.Title ?? "Untitled", post.ShortContent ?? string.Empty, post.Content ?? string.Empty, post.Author?.DisplayName ?? "Anonymous"));
            }

            return Json(mapped);
        }
    }
}