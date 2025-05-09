using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Entities;

[Table("Reviews")]
public class Review
{
    [Key]
    [Required]
    public int Id { get; set; }

    public int? UserId { get; set; }

    [Required]
    [MaxLength(500)]
    public required string Text { get; set; }

    [MaxLength(50)]
    [EmailAddress]
    public string? AnonEmail { get; set; }

    [Required]
    public DateTimeOffset DateCreated { get; set; }

    public User? User { get; set; }
}
