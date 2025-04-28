using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Entities;

[Table("RideRoles")]
public class RideRole
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = null!;

    public ICollection<Post>? Posts { get; set; } = new List<Post>();
}
