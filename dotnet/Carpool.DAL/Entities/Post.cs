using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Entities;

[Table("Posts")]
public class Post
{
    [Key]
    [Required]
    public int Id { get; set; }

    public int? UserId { get; set; }
    
    [Required]
    public int RideRoleId { get; set; }

    [Required]
    public int SourceId { get; set; }

    [Required]
    public int DestinationId { get; set; }

    public DateTime DepartureDateTime { get; set; }

    public int Seats { get; set; }

    public int? PricePerSeat { get; set; }

    public int? PricePerCar { get; set; }

    [MaxLength(200)]
    public string? Comment { get; set; }

    public DateTime DateCreated { get; set; }

    public DateTime DateModified { get; set; }

    [MaxLength(50)]
    public string? AnonName { get; set; }

    [MaxLength(20)]
    public string? AnonPhone { get; set; }

    [MaxLength(50)]
    public string? AnonCar { get; set; }

    public User? User { get; set; }
    
    public RideRole RideRole { get; set; } = null!;

    public Locality Source { get; set; } = null!;
    
    public Locality Destination { get; set; } = null!;
}
