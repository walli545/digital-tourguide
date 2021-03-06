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
    /// <param name="userName">The unique name of the user adding the PoIReview</param>
    /// <returns>Affected Rows</returns>
    public async Task<int> AddPoIReview(PostPoIReview body, string userName)
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
        UserName = userName
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

    /// <summary>
    /// Deletes all reviews from the given poi
    /// </summary>
    /// <param name="poiId">The poi Id</param>
    /// <returns>True: Successfully deleted or no reviews. False: poiId not found</returns>
    public bool DeletePoIReviews(Guid poiId)
    {
      var result = _dbContext.PointOfInterest.AsNoTracking().Where(poi => poi.PoIID == poiId).FirstOrDefault(); // as the id is the PK, there is only one entry (FirstOrDefault) or none
      if (result == null)
        return false;
      
      var reviews = _dbContext.PoIReviews.Where(poi => poi.PointOfInterest.PoIID == poiId).ToListAsync().Result;
      if (!reviews.Any())
        return true;
      foreach (PoIReview review in reviews)
      {
        var reviewDeleteResult = _dbContext.PoIReviews.Remove(review);
        if (reviewDeleteResult.State != EntityState.Deleted)
        {
          _logger.LogInformation($"Failed to delete review from the database! Item: {0} Given record:{1}", nameof(review), review, review);
          throw new Exception();
        }
      }

      return true;
    }

    /// <summary>
    /// Deletes the given review
    /// </summary>
    /// <param name="reviewId">id from the review to delete</param>
    /// <returns>Affected rows</returns>
    public async Task<int> DeleteReview(Guid reviewId)
    {
      var result = _dbContext.PoIReviews.Find(reviewId);
      if (result == null)
        return 0;

      var success = _dbContext.PoIReviews.Remove(result);
      if (success.State != EntityState.Deleted)
      {
        _logger.LogInformation($"Failed to delete PoI review from the database! Item: {0} Given poi:{1}", nameof(result), reviewId, result);
        throw new Exception();
      }
      return await _dbContext.SaveChangesAsync();
    }

    /// <summary>
    /// Gets all reviews for the given poi
    /// </summary>
    /// <param name="poiId">the id from the poi</param>
    /// <returns>List with the poi reviews</returns>
    public async Task<List<PoIReview>> GetPoIReviews(Guid poiId)
    {
      return await _dbContext.PoIReviews.Include(i => i.PointOfInterest).Where(review => review.PointOfInterest.PoIID == poiId).ToListAsync();
    }
  }
}
