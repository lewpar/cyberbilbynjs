using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CyberBilbyApi.Controllers.Models.Request;

public class CreateBlogPostDto
{
    [Required]
    [MinLength(1)]
    [MaxLength(255)]
    [DisplayName("Title")]
    public string? Title { get; set; }

    [Required]
    [MinLength(1)]
    [MaxLength(128)]
    [DisplayName("Slug")]
    public string? Slug { get; set; }

    [Required]
    [MinLength(1)]
    [MaxLength(255)]
    [DisplayName("Short Content")]
    public string? ShortContent { get; set; }

    [Required]
    [MinLength(1)]
    [MaxLength(25000)]
    [DisplayName("Content")]
    public string? Content { get; set; }
}
