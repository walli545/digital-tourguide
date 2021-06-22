using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace API.Models
{
  [DataContract]
  public class Route
  {
    /// <summary>
    /// Gets or Sets Id
    /// </summary>
    [Key]
    [Required]
    [DataMember(Name = "routeId")]
    public Guid RouteID { get; set; }

    /// <summary>
    /// The PoIs that are on this route
    /// </summary>
    [DataMember(Name = "pointOfInterests")]
    public List<PointOfInterest> PointOfInterests { get; set; }

    /// <summary>
    /// Gets or Sets Name
    /// </summary>
    [Required]
    [DataMember(Name = "name")]
    public string Name { get; set; }

    /// <summary>
    /// Gets or Sets Description
    /// </summary>
    [Required]
    [DataMember(Name = "description")]
    public string Description { get; set; }

    /// <summary>
    /// Gets or Sets CreatorName
    /// </summary>
    [Required]
    [DataMember(Name = "creatorName")]
    public string CreatorName { get; set; }

    /// <summary>
    /// Gets or Sets Duration
    /// </summary>
    [Required]
    [DataMember(Name = "duration")]
    public float? Duration { get; set; }

    /// <summary>
    /// Gets or Sets Polyline
    /// </summary>
    [Required]
    [DataMember(Name = "polyline")]
    public string Polyline { get; set; }

    /// <summary>
    /// Gets or Sets AverageRating
    /// </summary>
    [Required]
    [DataMember(Name = "averageRating")]
    public double? AverageRating { get; set; }

    /// <summary>
    /// Gets or Sets NumberOfRatings
    /// </summary>
    [Required]
    [DataMember(Name = "numberOfRatings")]
    public int? NumberOfRatings { get; set; }
  }
}