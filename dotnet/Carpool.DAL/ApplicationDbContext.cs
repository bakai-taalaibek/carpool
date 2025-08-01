using Carpool.DAL.Entities;
using Carpool.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Country> Countries { get; set; }

        public DbSet<District> Districts { get; set; }

        public DbSet<Locality> Localities { get; set; }

        public DbSet<RidePost> RidePosts { get; set; }

        public DbSet<Region> Regions { get; set; }

        public DbSet<Review> Reviews { get; set; }

        public DbSet<RideRole> RideRoles { get; set; }

        public DbSet<RidePostComment> RidePostComments { get; set; }

        public DbSet<LocalityType> LocalityTypes { get; set; }

        public DbSet<Aimak> Aimaks { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Country>()
            .HasIndex(c => c.Name)
            .IsUnique();

            modelBuilder.Entity<Region>()
            .HasIndex(r => r.Name)
            .IsUnique();

            modelBuilder.Entity<LocalityType>()
            .HasIndex(d => d.Name)
            .IsUnique();

            modelBuilder.Entity<RideRole>()
            .HasIndex(r => r.Name)
            .IsUnique();

            modelBuilder.Entity<RideRole>().HasData(
                new RideRole
                {
                    Id = 1,
                    Name = "Driver",
                },
                new RideRole
                {
                    Id = 2,
                    Name = "Passenger",
                });
        }
    }
}
