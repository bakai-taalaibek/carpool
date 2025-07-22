using Microsoft.AspNetCore.Identity;

namespace Carpool.DAL.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string? DisplayName { get; set; }

        public string? Car { get; set; }

        public string? About { get; set; }

        public string? Avatar { get; set; }

        public DateTimeOffset DateCreated { get; set; }
    }
}