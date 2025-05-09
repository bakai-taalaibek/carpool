using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Entities;

[Table("Localities")]
public class Locality
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public required string Name { get; set; }

    [MaxLength(50)]
    public string? OldName { get; set; }

    [Required]
    public int DistrictId { get; set; }

    [Required]
    public required District District { get; set; }
}
