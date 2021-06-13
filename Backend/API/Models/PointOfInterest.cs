using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace API.Models
{
  /// <summary>
  /// Model class for a PointOfInterest
  /// </summary>
  [DataContract]
  public partial class PointOfInterest
  {
    /// <summary>
    /// Gets or Sets Id
    /// </summary>
    [Key]
    [Required]
    [DataMember(Name = "poiId")]
    public Guid PoIID { get; set; }

    /// <summary>
    /// Gets or Sets Name
    /// </summary>
    [Required]
    [DataMember(Name = "name")]
    public string Name { get; set; }

    /// <summary>
    /// Gets or Sets username
    /// </summary>
    [Required]
    [DataMember(Name = "userName")]
    public string UserName { get; set; }

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

    /// <summary>
    /// Gets or Sets AverageRating
    /// </summary>
    [Required]
    [DataMember(Name = "averageRating")]
    public decimal? AverageRating { get; set; }

    /// <summary>
    /// Gets or Sets NumberOfRatings
    /// </summary>
    [Required]
    [DataMember(Name = "numberOfRatings")]
    public int? NumberOfRatings { get; set; }

    /// <summary>
    /// Gets or Sets ImageUrl
    /// </summary>
    [Required]
    [DataMember(Name = "imageUrl")]
    public string ImageUrl { get; set; }
  }
}
