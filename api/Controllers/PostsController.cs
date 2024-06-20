using Microsoft.AspNetCore.Mvc;

using CyberBilby.Controllers.Models;

namespace CyberBilby.Controllers.Api
{
    [ApiController]
    [Route("api/posts")]
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