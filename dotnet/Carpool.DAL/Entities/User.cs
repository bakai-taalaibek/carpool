using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Entities;

[Table("Users")]
public class User
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    public int UserRoleId { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = null!;

    [Required]
    [MaxLength(20)]
    public string Phone { get; set; } = null!;

    [MaxLength(50)]
    [EmailAddress]
    public string? Email { get; set; }

    [MaxLength(50)]
    public string? Car { get; set; }

    [MaxLength(100)]
    public string? About { get; set; }

    public string? Avatar { get; set; }

    [Required]
    public DateTimeOffset DateCreated { get; set; }

    [Required]
    public string PasswordHash { get; set; } = null!;

    [Required]
    public UserRole UserRole { get; set; } = null!;
}
