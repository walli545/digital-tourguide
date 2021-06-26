using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace API.Models
{
  public class RouteReview
  {
    /// <summary>
    /// Gets or Sets RouteReviewId
    /// </summary>
    [Key]
    [Required]
    [DataMember(Name = "routeReviewId")]
    public Guid RouteReviewId { get; set; }

    /// <summary>
    /// Reference to a route
    /// </summary>
    [Required]
    [DataMember(Name = "route")]
    public Route Route { get; set; }

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
