using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Carpool.DAL.Entities;

namespace Carpool.Entities;

[Table("PostComments")]
public class PostComment
{
    [Key]
    [Required]
    public int Id { get; set; }

    [ForeignKey(nameof(Post))]
    public int PostId { get; set; }

    [ForeignKey(nameof(User))]
    public string? UserId { get; set; }

    [ForeignKey(nameof(Guest))]
    public Guid? GuestId { get; set; }

    [Required]
    [MaxLength(50)]
    public required string Text { get; set; }

    public DateTimeOffset DateCreated { get; set; }

    public DateTimeOffset DateModified { get; set; }

    public required Post Post { get; set; }

    public ApplicationUser? User { get; set; }

    public Guest? Guest { get; set; }
}
