using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Entities;

[Table("Countries")]
public class Country
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public required string Name { get; set; }

    public ICollection<Region>? Regions { get; set; } = [];
}
