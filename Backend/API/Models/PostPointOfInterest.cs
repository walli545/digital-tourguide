using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace API.Models
{
  /// <summary>
  /// Model class for posting a new poi
  /// </summary>
  [DataContract]
  public partial class PostPointOfInterest
  {
    /// <summary>
    /// Gets or Sets Id
    /// </summary>
    [DataMember(Name = "id")]
    public string Id { get; set; }

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
    /// Gets or Sets Latitude
    /// </summary>
    [Required]
    [DataMember(Name = "latitude")]
    public decimal? Latitude { get; set; }

    /// <summary>
    /// Gets or Sets Longitude
    /// </summary>
    [Required]
    [DataMember(Name = "longitude")]
    public decimal? Longitude { get; set; }
  }
}
