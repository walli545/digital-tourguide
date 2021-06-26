using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
  public class RouteReviewService : IRouteReviewService
  {
    private readonly ILogger<RouteReviewService> _logger;
    private readonly MariaDbContext _dbContext;

    /// <summary>
    /// Ctor.
    /// </summary>
    /// <param name="logger">Logger for fails.</param>
    /// <param name="dbContext">The desired db context.</param>
    public RouteReviewService(ILogger<RouteReviewService> logger, MariaDbContext dbContext)
    {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger), "Logger was null!");
      _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext), "Context was null!");
    }

    /// <summary>
    /// Add a new route review to the db
    /// </summary>
    /// <param name="body">The new review</param>
    /// <param name="userName">The unique name of the user adding the route</param>
    /// <returns>Affected Rows</returns>
    public async Task<int> AddRouteReview(PostRouteReview body, string userName)
    {
      var result = _dbContext.Route.Find(body.RouteID);
      if (result == null)
        return 0;

      var record = new RouteReview()
      {
        Route = result,
        Content = body.Content,
        Rating = body.Rating,
        RouteReviewId = Guid.NewGuid(),
        UserName = userName
      };

      var success = _dbContext.RouteReviews.Add(record);
      if (success.State != EntityState.Added)
      {
        _logger.LogInformation($"Failed to add route review to the database! Item: {0} Given body:{1}", nameof(record), body, body);
        throw new Exception(); //maybe choose other exception here
      }

      var saveResult = await _dbContext.SaveChangesAsync();
      if (saveResult > 0)
      {
        return saveResult;
      }
      throw new Exception(); // This path means no rows got affected after add
    }

    /// <summary>
    /// Deletes the given reviewId
    /// </summary>
    /// <param name="reviewId">The id from the review to delete</param>
    /// <returns>Affected rows</returns>
    public async Task<int> DeleteReview(Guid reviewId)
    {
      var result = _dbContext.RouteReviews.Find(reviewId);
      if (result == null)
        return 0;

      var success = _dbContext.RouteReviews.Remove(result);
      if (success.State != EntityState.Deleted)
      {
        _logger.LogInformation($"Failed to delete route review from the database! Item: {0} Given poi:{1}", nameof(result), reviewId, result);
        throw new Exception();
      }
      return await _dbContext.SaveChangesAsync();
    }

    /// <summary>
    /// Deletes all reviews from the given route
    /// </summary>
    /// <param name="routeId">The route Id</param>
    /// <returns>True: Successfully deleted or no reviews. False: RouteId not found</returns>
    public bool DeleteRouteReviews(Guid routeId)
    {
      var result = _dbContext.Route.AsNoTracking().Where(route => route.RouteID == routeId).FirstOrDefault(); // as the id is the PK, there is only one entry (FirstOrDefault) or none
      if (result == null)
        return false;

      var reviews = _dbContext.RouteReviews.Where(route => route.Route.RouteID == routeId).ToListAsync().Result;
      if (!reviews.Any())
        return true;
      foreach (RouteReview review in reviews)
      {
        var reviewDeleteResult = _dbContext.RouteReviews.Remove(review);
        if (reviewDeleteResult.State != EntityState.Deleted)
        {
          _logger.LogInformation($"Failed to delete review from the database! Item: {0} Given record:{1}", nameof(review), review, review);
          throw new Exception();
        }
      }

      return true;
    }

    /// <summary>
    /// Gets all reviews for the given Route
    /// </summary>
    /// <param name="routeId">The id from the route to get</param>
    /// <returns>List with all route reviews</returns>
    public async Task<List<RouteReview>> GetRouteReviews(Guid routeId)
    {
      return await _dbContext.RouteReviews.Include(i => i.Route).Where(review => review.Route.RouteID == routeId).ToListAsync();
    }
  }
}
