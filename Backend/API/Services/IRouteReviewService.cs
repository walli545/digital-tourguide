using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
  public interface IRouteReviewService
  {
    public Task<int> AddRouteReview(PostRouteReview body);

    public bool DeleteRouteReviews(Guid RouteID);
  }
}
