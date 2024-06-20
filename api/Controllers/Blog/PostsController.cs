using Microsoft.AspNetCore.Mvc;

using CyberBilby.Controllers.Blog.Models;
using Microsoft.AspNetCore.Cors;

namespace CyberBilby.Controllers.Blog
{
    [ApiController]
    [Route("api/blog/posts")]
    [EnableCors("MyCorsPolicy")]
    public class PostsController : Controller
    {
        public IActionResult Get()
        {
            return Json(new List<BlogPost>() {
                new BlogPost(title: "Test Blog Post 1", shortContent: "This is some short content for a blog post!"),
                new BlogPost(title: "Test Blog Post 2", shortContent: "This is some short content for a blog post!"),
                new BlogPost(title: "Test Blog Post 3", shortContent: "This is some short content for a blog post!"),
                new BlogPost(title: "Test Blog Post 4", shortContent: "This is some short content for a blog post!")
            });
        }
    }
}