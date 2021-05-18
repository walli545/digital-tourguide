using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API
{
    /// <summary>
    /// Database context for a mariadb
    /// </summary>
    public partial class MariaDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
      /// <summary>
      /// Ctor.
      /// </summary>
      /// <param name="options">DbContext options for the database</param>
      public MariaDbContext(DbContextOptions<MariaDbContext> options)
          : base(options)
      {
      }

      /// <summary>
      /// The DbSets of the poi's
      /// </summary>
      public virtual DbSet<PointOfInterest> PointOfInterest { get; set; }
    }
  }
