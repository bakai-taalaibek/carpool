using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Models;

[Table("Review")]
public class Review
{
    [Key]
    [Required]
    public int Id { get; set; }

    public int UserId { get; set; }

    [Required]
    [MaxLength(50)]
    public string Text { get; set; } = null!;

    [Required]
    [MaxLength(50)]
    public string AnonEmail { get; set; } = null!;

    [Required]
    public DateTime DateCreated { get; set; }

    public User? User { get; set; }
}
