namespace CyberBilbyApi.Middleware;

public class DebugMiddleware
{
    private readonly RequestDelegate next;

    public DebugMiddleware(RequestDelegate next)
    {
        this.next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        await next(context);
    }
}
