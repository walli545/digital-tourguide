using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace API.Models
{
  public enum Role
  {
    ContentCreator,
    Moderator,
    Admin,
    Promoter
  }

  [DataContract]
  public class RoleModel
  {
    

    /// <summary>
    /// Gets or Sets CreatorName
    /// </summary>
    [Required]
    [DataMember(Name = "creatorName")]
    public string CreatorName { get; set; }

    /// <summary>
    /// The requested role
    /// </summary>
    [Required]
    [DataMember(Name = "requestedRole")]
    public Role RequestedRole { get; set; }
  }
}
