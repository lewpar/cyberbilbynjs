using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace CyberBilbyApi.Controllers.Validators;

public class Base64MaxFileSizeAttribute : ValidationAttribute
{
    private readonly float size;
    private readonly Base64FileSizeUnits unit;

    public Base64MaxFileSizeAttribute(float size, Base64FileSizeUnits unit) : base(errorMessage: "{0} must be less than {1} {2}(s) in size.")
    {
        this.size = size;
        this.unit = unit;
    }

    public override bool IsValid(object? value)
    {
        if(value is null || value is not string data)
        {
            return false;
        }

        var match = Regex.Match(data, "data:.*;base64,(.*)");
        if (!match.Success || match.Groups.Count < 2)
        {
            return false;
        }

        var base64 = match.Groups[1].Value;

        var fileData = Convert.FromBase64String(base64);
        float fileSize = fileData.Length;

        switch(this.unit)
        {
            case Base64FileSizeUnits.Byte:
                break;

            case Base64FileSizeUnits.Kilobyte:
                fileSize = fileSize / 1024;
                break;

            case Base64FileSizeUnits.Megabyte:
                fileSize = (fileSize / 1024) / 1024;
                break;
        }

        if(fileSize > this.size)
        {
            return false;
        }

        return true;
    }

    public override string FormatErrorMessage(string name)
    {
        return String.Format(ErrorMessageString, name, this.size.ToString(), this.unit.ToString());
    }
}
