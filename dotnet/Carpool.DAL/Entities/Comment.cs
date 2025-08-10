using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Carpool.Entities;

namespace Carpool.DAL.Entities;

public class Comment
{
    [Key]
    [Required]
    public int Id { get; set; }

    [ForeignKey(nameof(Parent))]
    public int? ParentId { get; set; }

    public required string Content { get; set; }

    [ForeignKey(nameof(User))]
    public string? UserId { get; set; }

    [ForeignKey(nameof(Guest))]
    public Guid? GuestId { get; set; }

    [ForeignKey(nameof(RidePost))]
    public int? RidePostId { get; set; }

    public bool IsDeleted { get; set; }
    public bool IsEdited { get; set; }

    public DateTimeOffset DateCreated { get; set; }
    public DateTimeOffset DateModified { get; set; }

    public ApplicationUser? User { get; set; }
    public Guest? Guest { get; set; }
    public Comment? Parent { get; set; }
    public ICollection<Comment> Children { get; set; } = new List<Comment>();
    public RidePost? RidePost { get; set; }
}
