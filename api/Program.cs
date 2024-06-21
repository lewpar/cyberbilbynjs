using CyberBilbyApi.Database;
using CyberBilbyApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace CyberBilbyApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        AddServices(builder, builder.Services);

        var app = builder.Build();

        RunDatabaseMigrations(app);

        app.UseAuthentication();
        app.UseAuthorization();

        //app.UseHttpsRedirection();
        app.MapControllers();
        app.UseCors();

        app.Run();
    }

    static void AddServices(WebApplicationBuilder builder, IServiceCollection services)
    {
        services.AddControllers();

        services.AddCors(o => o.AddPolicy("MyCorsPolicy", builder =>
        {
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        }));

        services.AddDbContext<CyberBilbyDbContext>(db =>
        {
            string? mySqlConn = builder.Configuration.GetConnectionString("MySql");
            if(string.IsNullOrEmpty(mySqlConn))
            {
                throw new NullReferenceException("MySql Connection String was null or empty.");
            }

            ServerVersion? mySqlVersion = ServerVersion.AutoDetect(mySqlConn);
            if(mySqlVersion is null)
            {
                throw new NullReferenceException("Failed to auto-detect MySql version.");
            }

            db.UseMySql(mySqlConn, mySqlVersion);
        });

        var jwtIssuer = builder.Configuration["Jwt:Issuer"];
        var jwtAudience = builder.Configuration["Jwt:Audience"];
        var jwtKey = builder.Configuration["Jwt:Key"];

        if(string.IsNullOrEmpty(jwtIssuer) || string.IsNullOrEmpty(jwtAudience) || string.IsNullOrEmpty(jwtKey))
        {
            throw new NullReferenceException("One or more Jwt settings are missing or empty.");
        }

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer = jwtIssuer,
                ValidAudience = jwtAudience,

                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
            };
        });

        services.AddAuthorization();

        services.AddScoped<JwtService>();
    }

    static void RunDatabaseMigrations(WebApplication app)
    {
        using (var scope = app.Services.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<CyberBilbyDbContext>();
            dbContext.Database.Migrate();
        }
    }
}
