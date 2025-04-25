using Carpool.Entities;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Country> Countries { get; set; }

        public DbSet<District> Districts { get; set; }

        public DbSet<Locality> Localities { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Region> Regions { get; set; }
    
        public DbSet<Review> Reviews { get; set; }

        public DbSet<RideRole> RideRoles { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<UserRole> UserRoles { get; set; }

        public DbSet<PostComments> PostComments { get; set; }
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
