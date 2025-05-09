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
    public required string Name { get; set; }
    [Required]
    [MaxLength(20)]
    public required string Phone { get; set; }
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
    public required string PasswordHash { get; set; }
    [Required]
    public required UserRole UserRole { get; set; }}
