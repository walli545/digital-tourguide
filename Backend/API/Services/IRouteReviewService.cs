using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
  public interface IRouteReviewService
  {
    public Task<List<RouteReview>> GetRouteReviews(Guid routeId);

    public Task<int> AddRouteReview(PostRouteReview body);

    public Task<int> DeleteReview(Guid reviewId);

    public bool DeleteRouteReviews(Guid RouteID);
  }
}
