using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Models;

[Table("Posts")]
public class Post
{
    [Key]
    [Required]
    public int Id { get; set; }
    public int? UserId { get; set; }
    public int RideRoleId { get; set; }
    public int SourceId { get; set; }
    public int DestinationId { get; set; }

    public DateTime DepartureDate { get; set; }
    public int Seats { get; set; }
    public int PricePerSeat { get; set; }
    public int PricePerCar { get; set; }
    public string? Comment { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateModified { get; set; }

    public string? AnonName { get; set; }
    public string? AnonPhone { get; set; }
    public string? AnonCar { get; set; }

    public User? User { get; set; }
    public RideRole RideRole { get; set; } = null!;
    public Locality? Source { get; set; }
    public Locality? Desctination { get; set; }
}
