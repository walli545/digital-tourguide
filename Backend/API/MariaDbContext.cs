﻿using API.Models;
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
    /// The DbSet of the route table
    /// </summary>
    public virtual DbSet<Route> Route { get; set; }

    /// <summary>
    /// The DbSets of the poi's
    /// </summary>
    public virtual DbSet<PointOfInterest> PointOfInterest { get; set; }

    /// <summary>
    /// The DbSets of the connections between routes and pois
    /// </summary>
    public virtual DbSet<RoutePoIConnector> ConnectionsRoutePoI{ get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<PointOfInterest>().ToTable("PointOfInterest");
      modelBuilder.Entity<Route>().ToTable("Route");
      modelBuilder.Entity<RoutePoIConnector>().ToTable("ConnectionsRoutePoI");

      modelBuilder.Entity<Route>().Ignore(r => r.PointOfInterests);

      modelBuilder.Entity<RoutePoIConnector>()
                .HasKey(c => new { c.PoIID, c.RouteID});
    }
  }
}