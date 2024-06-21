using CyberBilbyApi.Database;
using CyberBilbyApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
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

        // UseCors should run before UseAuthentication/Authorization because it does preflight checks to ensure the transport is safe.
        // This fixes error unrelated to CORS showing up as CORS errors.
        app.UseCors("AllowReactFrontend");

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }

    static void AddServices(WebApplicationBuilder builder, IServiceCollection services)
    {
        services.AddControllers();

        var reactEndpoint = builder.Configuration["Endpoints:React"];
        if(string.IsNullOrEmpty(reactEndpoint))
        {
            throw new NullReferenceException("React Endpoint is null or empty.");
        }

        var apiEndpoint = builder.Configuration["Endpoints:Api"];
        if (string.IsNullOrEmpty(apiEndpoint))
        {
            throw new NullReferenceException("API Endpoint is null or empty.");
        }

        services.AddCors(o => o.AddPolicy("AllowReactFrontend", builder =>
        {
            builder.WithOrigins(reactEndpoint).AllowCredentials().AllowAnyHeader().AllowAnyMethod();
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

        var jwtKey = builder.Configuration["Jwt:Key"];

        if(string.IsNullOrEmpty(jwtKey))
        {
            throw new NullReferenceException("Jwt key is missing or empty.");
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

                ValidIssuer = apiEndpoint,
                ValidAudience = reactEndpoint,

                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),

                RoleClaimType = ClaimTypes.Role
            };

            // The JWT is sent as a HTTP-Only cookie and is not accessible by the client,
            // this means the React frontend cannot send the cookie under the Authorization header.
            // I must extract the cookie myself from the request and assign the token myself.
            options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    if (context.Request.Cookies.ContainsKey("jwt"))
                    {
                        context.Token = context.Request.Cookies["jwt"];
                    }

                    return Task.CompletedTask;
                }
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
