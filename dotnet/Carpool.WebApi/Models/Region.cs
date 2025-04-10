using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Models;

[Table("Regions")]
public class Region
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = null!;

    [Required]
    public int CountryId { get; set; }

    [Required]
    public Region Country { get; set; } = null!;

    public ICollection<District>? Districts { get; set; }
}
