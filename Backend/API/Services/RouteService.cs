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

    public Task<int> DeleteRoute(int routeId)
    {
      throw new NotImplementedException();
    }

    public Task<List<Route>> GetAllRoutes(string username)
    {
      throw new NotImplementedException();
    }

    public Task<Route> GetRoute(int routeId)
    {
      throw new NotImplementedException();
    }

    public Task<int> PutRoute(PostRoute route)
    {
      throw new NotImplementedException();
    }
  }
}
