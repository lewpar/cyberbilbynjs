using SixLabors.ImageSharp;

using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace CyberBilbyApi.Controllers.Validators;

public class Base64FileTypeAttribute : ValidationAttribute
{
    private readonly Base64FileType fileType;

    public Base64FileTypeAttribute(Base64FileType fileType) : base(errorMessage: "{0} must have a file type of {1}.")
    {
        this.fileType = fileType;
    }

    public override bool IsValid(object? value)
    {
        if (value is null || value is not string data)
        {
            return false;
        }

        var match = Regex.Match(data, "data:(.*);base64,(.*)");
        if (!match.Success || match.Groups.Count < 3)
        {
            return false;
        }

        var base64Type = match.Groups[1].Value;
        var base64 = match.Groups[2].Value;

        var fileData = Convert.FromBase64String(base64);

        // Soft file type check
        var type = GetFileTypeFromMime(base64Type);
        if(type != fileType)
        {
            return false;
        }

        // Hard file type checks
        if(type == Base64FileType.Image)
        {
            if(!IsValidImage(fileData))
            {
                return false;
            }
        }

        return true;
    }

    public override string FormatErrorMessage(string name)
    {
        return String.Format(ErrorMessageString, name, this.fileType.ToString());
    }

    private Base64FileType GetFileTypeFromMime(string mime)
    {
        switch(mime)
        {
            case "image/gif":
            case "image/jpg":
            case "image/jpeg":
            case "image/png":
                return Base64FileType.Image;

            default:
                return Base64FileType.Unknown;
        }
    }

    private bool IsValidImage(byte[] data)
    {
        try
        {
            using var fs = new MemoryStream(data);
            var image = Image.Load(fs);
        }
        catch(Exception)
        {
            return false;
        }

        return true;
    }
}
