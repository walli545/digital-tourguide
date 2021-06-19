using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
  public class PointOfInterestReviewService : IPointOfInterestReviewService
  {
    private readonly ILogger<PointOfInterestReviewService> _logger;
    private readonly MariaDbContext _dbContext;

    /// <summary>
    /// Ctor.
    /// </summary>
    /// <param name="logger">Logger for fails.</param>
    /// <param name="dbContext">The desired db context.</param>
    public PointOfInterestReviewService(ILogger<PointOfInterestReviewService> logger, MariaDbContext dbContext)
    {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger), "Logger was null!");
      _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext), "Context was null!");
    }

    /// <summary>
    /// Add a new poi review to the db
    /// </summary>
    /// <param name="body">The new review</param>
    /// <returns>Affected Rows</returns>
    public async Task<int> AddPoIReview(PostPoIReview body)
    {
      var result = _dbContext.PointOfInterest.Find(body.PoIID);
      if (result == null)
        return 0;

      // TODO: (Simon fragen) check if user exists.

      var record = new PoIReview()
      {
        PointOfInterest = result,
        Content = body.Content,
        Rating = body.Rating,
        PoIReviewId = Guid.NewGuid(),
        UserName = body.UserName
      };

      var success = _dbContext.PoIReviews.Add(record);
      if (success.State != EntityState.Added)
      {
        _logger.LogInformation($"Failed to add PoI review to the database! Item: {0} Given body:{1}", nameof(record), body, body);
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
