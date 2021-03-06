using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
  public interface IRouteService
  {
    public Task<Route> AddRoute(PostRoute route, string creatorName);

    public Task<int> DeleteRoute(Guid routeId);

    public Task<Route> GetRoute(Guid routeId);

    public Task<List<Route>> GetAllRoutes(string userName);
    public Task<List<Route>> GetAllRoutes();

    public Task<int> PutRoute(PutRoute route, string creatorName);
  }
}