using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Entities;

[Table("Regions")]
public class Region
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public required string Name { get; set; }

    [Required]
    public int CountryId { get; set; }

    [Required]
    public required Country Country { get; set; }

    public ICollection<District>? Districts { get; set; } = [];
}
