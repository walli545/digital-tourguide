using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace API.Models
{
  public class PostRouteReview
  {
    /// <summary>
    /// Gets or Sets Id
    /// </summary>
    [Required]
    [DataMember(Name = "routeId")]
    public Guid RouteID { get; set; }

    /// <summary>
    /// Gets or Sets Content
    /// </summary>
    [Required]
    [DataMember(Name = "content")]
    public string Content { get; set; }

    /// <summary>
    /// Gets or Sets Rating
    /// </summary>
    [Required]
    [DataMember(Name = "rating")]
    public int Rating { get; set; }

    /// <summary>
    /// Gets or Sets username
    /// </summary>
    [Required]
    [DataMember(Name = "userName")]
    public string UserName { get; set; }
  }
}
