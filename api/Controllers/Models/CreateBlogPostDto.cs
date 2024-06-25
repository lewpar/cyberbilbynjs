using System.ComponentModel.DataAnnotations;

namespace CyberBilbyApi.Controllers.Models;

public class CreateBlogPostDto
{
    [Required(ErrorMessage = "You must supply a title.")]
    [MinLength(1, ErrorMessage = "Title must be between 1 and 255 characters.")]
    [MaxLength(255, ErrorMessage = "Title must be between 1 and 255 characters.")]
    public string? Title { get; set; }

    public string? ShortContent { get; set; }
    public string? Content { get; set; }
}
