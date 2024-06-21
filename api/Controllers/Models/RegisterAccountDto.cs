namespace CyberBilbyApi.Controllers.Models;

public class RegisterAccountDto
{
    public string? DisplayName { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }
    public string? ConfirmPassword { get; set; }
}
