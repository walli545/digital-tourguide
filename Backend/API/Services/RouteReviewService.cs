﻿using API.Models;
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
    /// <returns>Affected Rows</returns>
    public async Task<int> AddRouteReview(PostRouteReview body)
    {
      var result = _dbContext.Route.Find(body.RouteID);
      if (result == null)
        return 0;

      // TODO: (Simon fragen) check if user exists.

      var record = new RouteReview()
      {
        Route = result,
        Content = body.Content,
        Rating = body.Rating,
        RouteReviewId = Guid.NewGuid(),
        UserName = body.UserName
      };

      var success = _dbContext.RouteReviews.Add(record);
      if (success.State != EntityState.Added)
      {
        _logger.LogInformation($"Failed to add PoI to the database! Item: {0} Given body:{1}", nameof(record), body, body);
        throw new Exception(); //maybe choose other exception here
      }

      var saveResult = await _dbContext.SaveChangesAsync();
      if (saveResult > 0)
      {
        return saveResult;
      }
      throw new Exception(); // This path means no rows got affected after add
    }
  }
}
