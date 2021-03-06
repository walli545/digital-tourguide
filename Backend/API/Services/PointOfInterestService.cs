using API.Helper;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
  public class PointOfInterestService : IPointOfInterestService
  {
    private readonly ILogger<PointOfInterestService> _logger;
    private readonly MariaDbContext _dbContext;
    private readonly IPointOfInterestReviewService _poiReviewService;

    /// <summary>
    /// Ctor.
    /// </summary>
    /// <param name="logger">Logger for fails.</param>
    /// <param name="dbContext">The desired db context.</param>
    /// /// <param name="poiReviewService">Serviceclass for the poi reviews.</param>
    public PointOfInterestService(ILogger<PointOfInterestService> logger, MariaDbContext dbContext, IPointOfInterestReviewService poiReviewService)
    {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger), "logger was null!");
      _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext), "Context was null!");
      _poiReviewService = poiReviewService ?? throw new ArgumentNullException(nameof(poiReviewService), "Context was null!");
    }

    /// <summary>
    /// Adds a poi to the database
    /// Throws: Exception when an internal server error occurs
    /// </summary>
    /// <param name="poi">The poi to add</param>
    /// <param name="userName">The unique name of the user adding the PoI</param>
    /// <param name="isPromoted">Defines if this poi is promoted or not</param>
    /// <returns>The added poi as json format</returns>
    public async Task<PointOfInterest> AddPoI(PostPointOfInterest poi, string userName, bool isPromoted)
    {
      var record = new PointOfInterest
      {
        PoIID = Guid.NewGuid(),
        Description = poi.Description,
        Latitude = poi.Latitude,
        Longitude = poi.Longitude,
        Name = poi.Name,
        UserName = userName,
        AverageRating = 0.0,
        NumberOfRatings = 0,
        ImageUrl = poi.ImageUrl,
        IsPromoted = isPromoted
      };

      var success = _dbContext.PointOfInterest.Add(record);
      if (success.State != EntityState.Added)
      {
        _logger.LogInformation($"Failed to add PoI to the database! Item: {0} Given body:{1}", nameof(record), poi, poi);
        throw new Exception(); //maybe choose other exception here
      }

      var result = await _dbContext.SaveChangesAsync();
      if (result > 0)
      {
        return record;
      }
      throw new Exception(); // This path means no rows got affected after add
    }

    /// <summary>
    /// Deletes the given poi
    /// </summary>
    /// <param name="poiID">the poiID to delete</param>
    /// <returns>Affected rows</returns>
    public async Task<int> DeletePoI(Guid poiID)
    {
      var result = _dbContext.PointOfInterest.Find(poiID);
      if (result == null)
        return 0;

      var reviewsDelete = _poiReviewService.DeletePoIReviews(result.PoIID);
      if (!reviewsDelete)
        return 0;

      var success = _dbContext.PointOfInterest.Remove(result);
      if (success.State != EntityState.Deleted)
      {
        _logger.LogInformation($"Failed to delete PoI from the database! Item: {0} Given poi:{1}", nameof(result), poiID, result);
        throw new Exception();
      }
      return await _dbContext.SaveChangesAsync();
    }

    /// <summary>
    /// Get all poi's from a given user
    /// </summary>
    /// <param name="username">The username to get the poi's from</param>
    /// <returns>The poi's from the given user</returns>
    public async Task<List<PointOfInterest>> GetAllPoIs(string username)
    {
      var poiIDsFromUser = await _dbContext.PointOfInterest.Where(poi => poi.UserName == username).Select(r => r.PoIID).ToListAsync();
      if (poiIDsFromUser == null)
        return null;

      var pois = new List<PointOfInterest>();
      foreach (Guid poiID in poiIDsFromUser)
      {
        pois.Add(await GetPoI(poiID));
      }

      return pois;
    }

    /// <summary>
    /// Get all poi's
    /// </summary>
    /// <returns>List of all pois</returns>
    public async Task<List<PointOfInterest>> GetAllPoIs()
    {
      var poiIds = await _dbContext.PointOfInterest.Select(r => r.PoIID).ToListAsync();
      if (poiIds == null)
        return null;

      var pois = new List<PointOfInterest>();
      foreach (Guid poiID in poiIds)
      {
        pois.Add(await GetPoI(poiID));
      }

      return pois;
    }

    /// <summary>
    /// Returns the center of the points from the given user.
    /// </summary>
    /// <param name="username">The name of the creator of the pois</param>
    /// <returns>Center coordinate</returns>
    public async Task<CenterResult> GetCenter(string username)
    {
      var pois = await GetAllPoIs(username);
      if (!pois.Any())
        return null;
      decimal? totalLong = 0, totalLat = 0;
      foreach (PointOfInterest poi in pois)
      {
        totalLong += poi.Longitude;
        totalLat += poi.Latitude;
      }
      decimal? centerLong = totalLong / pois.Count;
      decimal? centerLat = totalLat / pois.Count;

      return new CenterResult()
      {
        Latitude = centerLat,
        Longitude = centerLong
      };
    }

    /// <summary>
    /// Get the information of the given poiID
    /// </summary>
    /// <param name="poiID">The poiID to get</param>
    /// <returns>The found poi</returns>
    public async Task<PointOfInterest> GetPoI(Guid poiID)
    {
      var result = await _dbContext.PointOfInterest.FindAsync(poiID);
      if (result == null)
        return null;

      var reviews = _dbContext.PoIReviews.Where(rev => rev.PointOfInterest.PoIID == poiID).ToListAsync().Result;

      if (reviews.Count > 0)
      {
        double? sumRatings = 0;
        foreach (PoIReview review in reviews)
          sumRatings += review.Rating;

        result.AverageRating = sumRatings / reviews.Count;
      }
      else
        result.AverageRating = 0;

      result.NumberOfRatings = reviews.Count;
      return result;
    }

    /// <summary>
    /// Gets all promoted pois
    /// </summary>
    /// <returns>A list of all promoted pois</returns>
    public async Task<List<PointOfInterest>> GetPromotedPois()
    {
      var promotedPois = await _dbContext.PointOfInterest.Where(poi => poi.IsPromoted).Select(r => r.PoIID).ToListAsync();
      if (promotedPois == null)
        return null;

      var pois = new List<PointOfInterest>();
      foreach (Guid poiID in promotedPois)
      {
        pois.Add(await GetPoI(poiID));
      }

      return pois;
    }

    public async Task<int> PutPoI(PutPointOfInterest poi, string userName)
    {
      var oldPoI = _dbContext.PointOfInterest.AsNoTracking().Where(p => p.PoIID == Guid.Parse(poi.Id)).FirstOrDefault();
      if (oldPoI == null)
        return 0;
      var newPoI = new PointOfInterest
      {
        PoIID = Guid.Parse(poi.Id),
        Description = poi.Description,
        Name = poi.Name,
        UserName = userName,
        ImageUrl = poi.ImageUrl,
        Latitude = poi.Latitude,
        Longitude = poi.Longitude,
        AverageRating = 0.0,
        NumberOfRatings = 0,
        IsPromoted = oldPoI.IsPromoted
      };

      var reviewsDelete = _poiReviewService.DeletePoIReviews(newPoI.PoIID);
      if (!reviewsDelete)
        return 0;

      try
      {
        var success = _dbContext.PointOfInterest.Update(newPoI);
        if (success.State != EntityState.Modified)
          _logger.LogInformation($"Failed to update PoI from the database! Item: {0} Given poi:{1}", nameof(poi), poi, poi);

        return await _dbContext.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        return 0;
      }
    }
  }
}