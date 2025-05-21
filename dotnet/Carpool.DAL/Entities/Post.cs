using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Entities;

[Table("Posts")]
public class Post
{
    [Key]
    [Required]
    public int Id { get; set; }

    [ForeignKey(nameof(User))]
    public int? UserId { get; set; }
    
    [ForeignKey(nameof(RideRole))]
    public int RideRoleId { get; set; }

    [ForeignKey(nameof(Source))]
    public int SourceId { get; set; }

    [ForeignKey(nameof(Destination))]
    public int DestinationId { get; set; }

    public DateTimeOffset DepartureDateTime { get; set; }

    [Range(1, int.MaxValue)]
    public int Seats { get; set; }

    [Range(0, int.MaxValue)]
    public int? PricePerSeat { get; set; }

    [Range(0, int.MaxValue)]
    public int? PricePerCar { get; set; }

    [MaxLength(200)]
    public string? Comment { get; set; }

    public DateTimeOffset DateCreated { get; set; }

    public DateTimeOffset DateModified { get; set; }

    [MaxLength(50)]
    public string? AnonName { get; set; }

    [MaxLength(20)]
    public string? AnonPhone { get; set; }

    [MaxLength(50)]
    public string? AnonCar { get; set; }

    public User? User { get; set; }
    
    public RideRole? RideRole { get; set; }

    public Locality? Source { get; set; }
    
    public Locality? Destination { get; set; }
}
