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
    public string? AltName { get; set; }

    [MaxLength(50)]
    public string? OldName { get; set; }

    [MaxLength(50)]
    public int LocalityTypeId { get; set; }

    [MaxLength(50)]
    public required LocalityType LocalityType { get; set; }

    public int Population { get; set; }

    public int? AimakId { get; set; }

    public Aimak? Aimak { get; set; }

    public int? DistrictId { get; set; }

    public District? District { get; set; }

    public int? RegionId { get; set; }

    public Region? Region { get; set; }

    public int? CountryId { get; set; }

    public Country? Country { get; set; }
}
