using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Entities;

[Table("PostComments")]
public class PostComment
{
    [Key]
    [Required]
    public int Id { get; set; }

    public int PostId { get; set; }

    public int? UserId { get; set; }

    [Required]
    [MaxLength(50)]
    public string Text { get; set; } = null!;

    public DateTimeOffset DateCreated { get; set; }

    public DateTimeOffset DateModified { get; set; }

    public User? User { get; set; }
    
    public Post Post { get; set; } = null!;
}
