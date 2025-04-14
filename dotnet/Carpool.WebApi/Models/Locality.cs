using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Models;

[Table("Locality")]
public class Locality
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = null!;

    [MaxLength(50)]
    public string? OldName { get; set; }

    [Required]
    public int DistrictId { get; set; }

    [Required]
    public District District { get; set; } = null!;
}
