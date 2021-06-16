using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace API.Models
{
  /// <summary>
  /// Model class for a centerResult
  /// </summary>
  [DataContract]
  public class CenterResult
  {
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
