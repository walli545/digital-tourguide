﻿using API.Helper;
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

    /// <summary>
    /// Ctor.
    /// </summary>
    /// <param name="logger">Logger for fails.</param>
    /// <param name="dbContext">The desired db context.</param>
    public PointOfInterestService(ILogger<PointOfInterestService> logger, MariaDbContext dbContext)
    {
      _logger = logger ?? throw new ArgumentNullException("logger was null!", nameof(logger));
      _dbContext = dbContext ?? throw new ArgumentNullException("Context was null!", nameof(dbContext));
    }

    /// <summary>
    /// Adds a poi to the database
    /// Throws: Exception when an internal server error occurs
    /// </summary>
    /// <param name="poi">The poi to add</param>
    /// <returns>The added poi as json format</returns>
    public async Task<PointOfInterest> AddPoI(PostPointOfInterest poi)
    {
      var record = new PointOfInterest
      {
        PoIID = Guid.NewGuid(),
        Description = poi.Description,
        Latitude = poi.Latitude,
        Longitude = poi.Longitude,
        Name = poi.Name,
        AverageRating = 0.0M,
        NumberOfRatings = 0,
        ImageUrl = poi.ImageUrl
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
      return await _dbContext.PointOfInterest.Where(poi => poi.Name == username).ToListAsync();
    }

    /// <summary>
    /// Get the information of the given poiID
    /// </summary>
    /// <param name="poiID">The poiID to get</param>
    /// <returns>The found poi</returns>
    public async Task<PointOfInterest> GetPoI(Guid poiID)
    {
      return await _dbContext.PointOfInterest.FindAsync(poiID);
    }
    
    public async Task<int> PutPoI(PutPointOfInterest poi)
    {
      var oldPoI = _dbContext.PointOfInterest.AsNoTracking().Where(p => p.PoIID == Guid.Parse(poi.Id)).FirstOrDefault();
      if (oldPoI == null)
        return 0;
      var newPoI = new PointOfInterest
      {
        PoIID = Guid.Parse(poi.Id),
        Description = poi.Description,
        Name = poi.Name,
        ImageUrl = poi.ImageUrl,
        Latitude = poi.Latitude,
        Longitude = poi.Longitude,
        AverageRating = oldPoI.AverageRating,
        NumberOfRatings = oldPoI.NumberOfRatings
      };

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