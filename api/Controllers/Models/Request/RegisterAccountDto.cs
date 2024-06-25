using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace CyberBilbyApi.Controllers.Models.Request;

public class RegisterAccountDto
{
    [Required]
    [MinLength(1)]
    [MaxLength(64)]
    [RegularExpression(@"^[a-zA-Z\s]+$", ErrorMessage = "Display Name can only consist of alphabetical characters.")]
    [DisplayName("Display Name")]
    public string? DisplayName { get; set; }

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

    [Required]
    [MinLength(8)]
    [MaxLength(32)]
    [DisplayName("Confirmation Password")]
    public string? ConfirmPassword { get; set; }
}
