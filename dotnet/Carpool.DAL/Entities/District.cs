using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Entities;

[Table("Districts")]
public class District
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public required string Name { get; set; }

    [Required]
    public int RegionId { get; set; }

    [Required]
    public required Region Region { get; set; }

    public ICollection<Locality>? Localities { get; set; } = [];
}
