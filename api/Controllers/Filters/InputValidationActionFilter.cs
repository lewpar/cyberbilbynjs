using CyberBilbyApi.Controllers.Response;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CyberBilbyApi.Controllers.Filters;

public class InputValidationActionFilter : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if(context.ModelState.IsValid)
        {
            return;
        }

        var errors = context.ModelState.First().Value?.Errors;
        if(errors is null)
        {
            return;
        }

        var response = new BasicApiResponse(false, errors.First().ErrorMessage);

        context.Result = new JsonResult(response)
        {
            StatusCode = StatusCodes.Status400BadRequest
        };
    }
}
