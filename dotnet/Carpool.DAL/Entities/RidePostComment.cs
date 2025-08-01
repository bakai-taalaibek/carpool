using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Carpool.DAL.Entities;

namespace Carpool.Entities;

[Table("RidePostComments")]
public class RidePostComment
{
    [Key]
    [Required]
    public int Id { get; set; }

    [ForeignKey(nameof(RidePost))]
    public int RidePostId { get; set; }

    [ForeignKey(nameof(User))]
    public string? UserId { get; set; }

    [ForeignKey(nameof(Guest))]
    public Guid? GuestId { get; set; }

    [Required]
    [MaxLength(50)]
    public required string Text { get; set; }

    public DateTimeOffset DateCreated { get; set; }

    public DateTimeOffset DateModified { get; set; }

    public required RidePost RidePost { get; set; }

    public ApplicationUser? User { get; set; }

    public Guest? Guest { get; set; }
}
