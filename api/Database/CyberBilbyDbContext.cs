using CyberBilbyApi.Database.Tables;

using Microsoft.EntityFrameworkCore;

namespace CyberBilbyApi.Database
{
    public class CyberBilbyDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public CyberBilbyDbContext(DbContextOptions<CyberBilbyDbContext> options) : base(options) { }
    }
}
