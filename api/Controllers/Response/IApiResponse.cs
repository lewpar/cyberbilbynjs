namespace CyberBilbyApi.Controllers.Response;

public interface IApiResponse
{
    public bool Success { get; }
    public string Message { get; }
}
