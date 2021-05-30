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
    public RouteService(ILogger<RouteService> logger, MariaDbContext dbContext, IPointOfInterestService poiService)
    {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger), "Logger was null!");
      _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext), "Context was null!");
      _poiService = poiService ?? throw new ArgumentNullException(nameof(poiService), "Context was null!");
    }

    public async Task<Route> AddRoute(PostRoute route)
    {
      var record = new Route
      {
        RouteID = Guid.NewGuid(),
        CreatorName = route.CreatorName,
        Description = route.Description,
        Duration = route.Duration,
        Name = route.Name,
        Polyline = route.Polyline,
        PointOfInterests = new List<PointOfInterest>()
      };

      var routeAddSuccess = _dbContext.Route.Add(record);
      if (routeAddSuccess.State != EntityState.Added)
      {
        _logger.LogInformation($"Failed to add Route to the database! Item: {0} Given body:{1}", nameof(record), route, route);
        throw new Exception(); //maybe choose other exception here
      }

      foreach(Guid id in route.PointOfInterests)
      {
        var poi = _poiService.GetPoI(id);
        var connectorRecord = new RoutePoIConnector
        {
          PoIID = id,
          RouteID = record.RouteID
        };

        var connectorAddSuccess = _dbContext.ConnectionsRoutePoI.Add(connectorRecord);
        if (connectorAddSuccess.State != EntityState.Added)
        {
          _logger.LogInformation($"Failed to add connector to the database! Item: {0} Given body:{1}", nameof(connectorAddSuccess), connectorAddSuccess, connectorAddSuccess);
          throw new Exception(); //maybe choose other exception here
        }
        record.PointOfInterests.Add(poi.Result);
      }

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

      var records = await _dbContext.ConnectionsRoutePoI.Where(route => route.RouteID == routeId).ToListAsync();
      foreach(RoutePoIConnector record in records)
      {
        var connectorDeleteResult = _dbContext.ConnectionsRoutePoI.Remove(record);
        if (connectorDeleteResult.State != EntityState.Deleted)
        {
          _logger.LogInformation($"Failed to delete record from the database! Item: {0} Given record:{1}", nameof(record), record, record);
          throw new Exception();
        }
      }

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
      foreach(Guid routeID in routesFromUser)
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

      foreach(Guid poiId in records.Select(record => record.PoIID))
      {
        var poi = await _poiService.GetPoI(poiId);
        if (poi == null)
          throw new Exception(); // poi does not exist anymore!
        pois.Add(poi);
      }

      result.PointOfInterests = pois;
      return result;
    }

    public Task<int> PutRoute(PostRoute route)
    {
      throw new NotImplementedException();
    }
  }
}
