using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace API.Models
{
  public class PostPoIReview
  {
    /// <summary>
    /// Gets or Sets Id
    /// </summary>
    [Required]
    [DataMember(Name = "poIID")]
    public Guid PoIID { get; set; }

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
  }
}
