using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Models;

[Table("User")]
public class User
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string UserRoleId { get; set; } = null!;

    [Required]
    [MaxLength(50)]
    public string? Name { get; set; }

    [Required]
    public string? Phone { get; set; } = null!;

    [Required]
    public string? Email { get; set; } = null!;

    [Required]
    public string? Car { get; set; } = null!;

    [Required]
    public string? About { get; set; } = null!;

    [Required]
    public string? Avatar { get; set; } = null!;

    [Required]
    public DateTime DateCreated { get; set; }

    [Required]
    public string? Password { get; set; } = null!;

    [Required]
    public UserRole UserRole { get; set; } = null!;
}
