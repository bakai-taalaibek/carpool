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
    public string Text { get; set; } = null!;

    [Required]
    [MaxLength(50)]
    [EmailAddress]
    public string AnonEmail { get; set; } = null!;

    [Required]
    public DateTime DateCreated { get; set; }

    public User? User { get; set; }
}
