using CyberBilbyApi.Controllers.Validators;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Drawing;

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

    [Required]
    [Base64MaxFileSize(size: 5, unit: Base64FileSizeUnits.Megabyte)]
    [Base64FileType(Base64FileType.Image)]
    [DisplayName("Cover Image")]
    public string? CoverImage { get; set; }
}
