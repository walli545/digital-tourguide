using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Models
{
  /// <summary>
  /// Gets or Sets Role
  /// </summary>
  [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
  public enum Role
  {
    /// <summary>
    /// Enum for ContentCreator
    /// </summary>
    [EnumMember(Value = "contentCreator")]
    ContentCreator = 0,

    /// <summary>
    /// Enum for Moderator
    /// </summary>
    [EnumMember(Value = "moderator")]
    Moderator = 1,

    /// <summary>
    /// Enum for Admin
    /// </summary>
    [EnumMember(Value = "admin")]
    Admin = 2,

    /// <summary>
    /// Enum for Promoter
    /// </summary>
    [EnumMember(Value = "promoter")]
    Promoter = 3
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