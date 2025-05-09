using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Entities;

[Table("UserRoles")]
public class UserRole
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public required string RoleName { get; set; }

    public ICollection<User>? Users { get; set; } = [];
}
