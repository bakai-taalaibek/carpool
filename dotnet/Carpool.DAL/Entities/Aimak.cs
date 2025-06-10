using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Entities;

[Table("Aimaks")]
public class Aimak
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public required string Name { get; set; }

    [Required]
    public int DistrictId { get; set; }

    [Required]
    public required District District { get; set; }

    public ICollection<Locality>? Localities { get; set; } = [];
}
