﻿namespace CyberBilbyApi.Controllers.Response
{
    public class BasicApiResponse : IApiResponse
    {
        public bool Success { get; }
        public string Message { get; }

        public BasicApiResponse(bool success, string message)
        {
            Success = success;
            Message = message;
        }
    }
}