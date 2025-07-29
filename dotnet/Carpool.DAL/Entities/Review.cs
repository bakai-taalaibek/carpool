using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Carpool.DAL.Entities;

namespace Carpool.Entities;

[Table("Reviews")]
public class Review
{
    [Key]
    [Required]
    public int Id { get; set; }

    [ForeignKey(nameof(User))]
    public string? UserId { get; set; }

    [ForeignKey(nameof(Guest))]
    public Guid? GuestId { get; set; }

    [Required]
    [MaxLength(500)]
    public required string Text { get; set; }

    [MaxLength(50)]
    [EmailAddress]
    public string? AnonEmail { get; set; }

    [Required]
    public DateTimeOffset DateCreated { get; set; }

    public ApplicationUser? User { get; set; }

    public Guest? Guest { get; set; }
}
