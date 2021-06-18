using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
  public class RoutePoIConnector
  {
    /// <summary>
    /// Foreign key from the PoI
    /// </summary>
    public Guid PoIID { get; set; }

    /// <summary>
    /// Foreign key from the route
    /// </summary>
    public Guid RouteID { get; set; }

    /// <summary>
    /// The order of the poi on the route
    /// </summary>
    public int Order { get; set; }
  }
}
