using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Models;

[Table("Districts")]
public class District
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = null!;

    [Required]
    public int RegionId { get; set; }

    [Required]
    public Region Region { get; set; } = null!;

    public ICollection<Locality>? Localities { get; set; }
}
