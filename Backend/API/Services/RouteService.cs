using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
  public class RouteService : IRouteService
  {
    private readonly ILogger<RouteService> _logger;
    private readonly MariaDbContext _dbContext;
    private readonly IPointOfInterestService _poiService;

    /// <summary>
    /// Ctor.
    /// </summary>
    /// <param name="logger">Logger for fails.</param>
    /// <param name="dbContext">The desired db context.</param>
    /// <param name="poiService">Serviceclass for the poi's</param>
    public RouteService(ILogger<RouteService> logger, MariaDbContext dbContext, IPointOfInterestService poiService)
    {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger), "Logger was null!");
      _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext), "Context was null!");
      _poiService = poiService ?? throw new ArgumentNullException(nameof(poiService), "Context was null!");
    }

    private bool CheckRoutePoIs(List<Guid> pois)
    {
      if (pois.Count > 1) // at least 2 pois are needed for a route
      {
        //check if two consecutive pois are the same.
        for (int i = 0; i < pois.Count - 1; i++)
        {
          Guid next = Guid.Empty;
          Guid current = pois[i];

          if (i + 1 < pois.Count)
            next = pois[i + 1];

          if (current.Equals(next))
            return false;
        }
      }
      else
      {
        return false;
      }
      return true;
    }

    public async Task<Route> AddRoute(PostRoute postRoute)
    {
      if (!CheckRoutePoIs(postRoute.PointOfInterests))
        throw new InvalidOperationException("PostRoute body is not valid! At least two pois needed and no consecutive pois allowed");

      var record = new Route
      {
        RouteID = Guid.NewGuid(),
        CreatorName = postRoute.CreatorName,
        Description = postRoute.Description,
        Duration = postRoute.Duration,
        Name = postRoute.Name,
        Polyline = postRoute.Polyline,
        PointOfInterests = new List<PointOfInterest>()
      };

      var routeAddSuccess = _dbContext.Route.Add(record);
      if (routeAddSuccess.State != EntityState.Added)
      {
        _logger.LogInformation($"Failed to add Route to the database! Item: {0} Given body:{1}", nameof(record), postRoute, postRoute);
        throw new Exception(); //maybe choose other exception here
      }

      var pois = new List<PointOfInterest>();
      foreach (Guid id in postRoute.PointOfInterests)
      {
        var poi = await _poiService.GetPoI(id); // check that the poi exists
        if (poi == null)
          throw new ArgumentException("Given poiId does not exist!");
        pois.Add(poi);
      }

      ConnectPoIsToRoute(postRoute.PointOfInterests, record.RouteID);

      record.PointOfInterests = pois;

      var result = await _dbContext.SaveChangesAsync();
      if (result > 0)
      {
        return record;
      }
      throw new Exception(); // This path means no rows got affected after add
    }

    /// <summary>
    /// Deletes the given route from the database.
    /// </summary>
    /// <param name="routeId">The id from the route to delete</param>
    /// <returns>Affected rows</returns>
    public async Task<int> DeleteRoute(Guid routeId)
    {
      var result = _dbContext.Route.Find(routeId);
      if (result == null)
        return 0;

      var connectionsDelete = await DeleteConnections(result.RouteID);
      if (!connectionsDelete)
        return 0;

      var success = _dbContext.Route.Remove(result);
      if (success.State != EntityState.Deleted)
      {
        _logger.LogInformation($"Failed to delete PoI from the database! Item: {0} Given poi:{1}", nameof(result), routeId, result);
        throw new Exception();
      }
      return await _dbContext.SaveChangesAsync();
    }

    public async Task<List<Route>> GetAllRoutes(string creatorName)
    {
      var routesFromUser = await _dbContext.Route.Where(poi => poi.CreatorName == creatorName).Select(r => r.RouteID).ToListAsync();
      if (routesFromUser == null)
        return null;

      var routes = new List<Route>();
      foreach (Guid routeID in routesFromUser)
      {
        routes.Add(await GetRoute(routeID));
      }

      return routes;
    }

    public async Task<Route> GetRoute(Guid routeId)
    {
      var result = await _dbContext.Route.FindAsync(routeId);
      if (result == null)
        return null;

      var pois = new List<PointOfInterest>();

      var records = await _dbContext.ConnectionsRoutePoI.Where(route => route.RouteID == routeId).ToListAsync();

      foreach (Guid poiId in records.Select(record => record.PoIID))
      {
        var poi = await _poiService.GetPoI(poiId);
        if (poi == null)
          throw new Exception(); // poi does not exist anymore!
        pois.Add(poi);
      }

      result.PointOfInterests = pois;
      return result;
    }

    public async Task<int> PutRoute(PutRoute putRoute)
    {
      if (!CheckRoutePoIs(putRoute.PointOfInterests))
        throw new InvalidOperationException("PutRoute body is not valid! At least two pois needed and no consecutive pois allowed");

      var oldRoute = _dbContext.Route.AsNoTracking().Where(p => p.RouteID == Guid.Parse(putRoute.Id)).FirstOrDefault();
      if (oldRoute == null)
        return 0;

      var newRoute = new Route
      {
        RouteID = oldRoute.RouteID,
        CreatorName = putRoute.CreatorName,
        Description = putRoute.Description,
        Duration = putRoute.Duration,
        Name = putRoute.Name,
        Polyline = putRoute.Polyline,
      };

      await DeleteConnections(oldRoute.RouteID);

      var pois = new List<PointOfInterest>();
      foreach (Guid id in putRoute.PointOfInterests)
      {
        var poi = await _poiService.GetPoI(id);
        if (poi == null)
          throw new ArgumentException("Given poiId does not exist!");
        pois.Add(poi);
      }

      ConnectPoIsToRoute(putRoute.PointOfInterests, newRoute.RouteID);

      newRoute.PointOfInterests = pois;

      try
      {
        var success = _dbContext.Route.Update(newRoute);
        if (success.State != EntityState.Modified)
          _logger.LogInformation($"Failed to update route from the database! Item: {0} Given route:{1}", nameof(putRoute), putRoute, putRoute);

        return await _dbContext.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        return 0;
      }
    }

    private async Task<bool> DeleteConnections(Guid routeId)
    {
      var records = await _dbContext.ConnectionsRoutePoI.Where(route => route.RouteID == routeId).ToListAsync();
      if (!records.Any())
        return false;
      foreach (RoutePoIConnector record in records)
      {
        var connectorDeleteResult = _dbContext.ConnectionsRoutePoI.Remove(record);
        if (connectorDeleteResult.State != EntityState.Deleted)
        {
          _logger.LogInformation($"Failed to delete record from the database! Item: {0} Given record:{1}", nameof(record), record, record);
          throw new Exception();
        }
      }

      return true;
    }

    /// <summary>
    /// Connects the given pois to the given route
    /// </summary>
    /// <param name="pois">The ids from the pois to connect</param>
    /// <param name="routeID">The route id to connect the pois to</param>
    private void ConnectPoIsToRoute(List<Guid> pois, Guid routeID)
    {
      foreach (Guid id in pois)
      {
        var connectorRecord = new RoutePoIConnector
        {
          PoIID = id,
          RouteID = routeID
        };

        var connectorAddSuccess = _dbContext.ConnectionsRoutePoI.Add(connectorRecord);
        if (connectorAddSuccess.State != EntityState.Added)
        {
          _logger.LogInformation($"Failed to add connector to the database! Item: {0} Given body:{1}", nameof(connectorAddSuccess), connectorAddSuccess, connectorAddSuccess);
          throw new Exception(); //maybe choose other exception here
        }
      }
    }
  }
}
