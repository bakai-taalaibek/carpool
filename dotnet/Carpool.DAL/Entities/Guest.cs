using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Entities;

[Table("Guests")]
public class Guest
{
    [Key]
    [Required]
    public Guid Id { get; set; }

    public DateTimeOffset DateCreated { get; set; } = DateTime.UtcNow;
}
