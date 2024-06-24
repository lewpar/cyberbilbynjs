namespace CyberBilbyApi.Controllers.Response;

public class WhoAmIResponse : IApiResponse
{
    public bool Success { get; set; }
    public string Message { get; set; }

    public string? Role { get; set; }
    public bool IsLoggedIn { get; set; }

    public WhoAmIResponse(bool success, string message)
    {
        Success = success;
        Message = message;
    }
}
