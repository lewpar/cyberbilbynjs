using CyberBilbyApi.Database;

using Microsoft.EntityFrameworkCore;

namespace CyberBilbyApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            AddServices(builder, builder.Services);

            var app = builder.Build();

            RunDatabaseMigrations(app);

            app.UseHttpsRedirection();
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
}
