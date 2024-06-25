using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CyberBilbyApi.Controllers.Models.Request;

public class LoginAccountDto
{
    [Required]
    [MinLength(4)]
    [MaxLength(32)]
    [RegularExpression("^[A-Za-z0-9]+$", ErrorMessage = "Usernames can only contain alphanumeric characters.")]
    [DisplayName("Username")]
    public string? Username { get; set; }

    [Required]
    [MinLength(8)]
    [MaxLength(32)]
    [DisplayName("Password")]
    public string? Password { get; set; }
}
