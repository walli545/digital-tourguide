using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace API.Models
{
  [DataContract]
  public class PostRoute
  {

    /// <summary>
    /// Gets or Sets PointOfInterests
    /// </summary>
    [Required]
    [DataMember(Name = "pointOfInterests")]
    public List<Guid> PointOfInterests { get; set; }

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
  }
}
