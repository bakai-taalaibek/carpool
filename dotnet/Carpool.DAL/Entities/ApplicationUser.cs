using Microsoft.AspNetCore.Identity;

namespace Carpool.DAL.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string? DisplayName { get; set; }
    }
}