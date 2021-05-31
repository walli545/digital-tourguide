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

namespace API.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class PointOfInterestController : ControllerBase
  {

    //_logger.LogInformation("Hello World Logging :)");

    private readonly ILogger<PointOfInterestController> _logger;
    private readonly MariaDbContext _dbContext;

    public PointOfInterestController(ILogger<PointOfInterestController> logger, MariaDbContext dbContext)
    {
      _logger = logger ?? throw new ArgumentNullException("logger was null!", nameof(logger)); ;
      _dbContext = dbContext ?? throw new ArgumentNullException("Context was null!", nameof(dbContext));
    }

    /// <summary>
    /// Add a new poi to the database
    /// </summary>
    /// <param name="body"></param>
    /// <response code="200">Success</response>
    /// <response code="400">Invalid input</response>
    [HttpPost]
    [Route("/pointOfInterest")]
    [ValidateModelState]
    [SwaggerOperation("AddPOI")]
    [SwaggerResponse(statusCode: 200, type: typeof(PointOfInterest), description: "Success")]
    public virtual IActionResult AddPOI([FromBody] PostPointOfInterest body)
    {
      var record = new PointOfInterest
      {
        Id = Guid.NewGuid(),
        Description = body.Description,
        Latitude = body.Latitude,
        Longitude = body.Longitude,
        Name = body.Name,
        AverageRating = 0.0M,
        NumberOfRatings = 0
      };

      var success = _dbContext.Add(record);
      if (success.State != EntityState.Added)
      {
        _logger.LogInformation($"Failed to add PoI to the database! Item: {0} Given body:{1}", nameof(record), body, body);
        return StatusCode(500);
      }

      _dbContext.SaveChanges();
      var json = JsonConvert.SerializeObject(record);
      return StatusCode(200, json);
    }

    /// <summary>
    /// Deletes the poi to a given id
    /// </summary>
    /// <param name="poiID"></param>
    /// <response code="200">Success</response>
    /// <response code="404">Not found</response>
    [HttpDelete]
    [Route("/pointOfInterest/{poiID}")]
    [ValidateModelState]
    [SwaggerOperation("DeletePOI")]
    public virtual IActionResult DeletePOI([FromRoute][Required] Guid poiID)
    {
      var result = _dbContext.PointOfInterest.Find(poiID);
      if (result == null)
        return StatusCode(404);

      var success = _dbContext.PointOfInterest.Remove(result);
      if (success.State != EntityState.Deleted)
      {
        _logger.LogInformation($"Failed to delete PoI from the database! Item: {0} Given poi:{1}", nameof(result), poiID, result);
        return StatusCode(500);
      }
      _dbContext.SaveChanges();
      return StatusCode(200);
    }

    ///// <summary>
    ///// Get the center of all poi&#x27;s from the given user
    ///// </summary>
    ///// <param name="userName"></param>
    ///// <response code="200">Success</response>
    ///// <response code="404">User not found</response>
    //[HttpGet]
    //[Route("/v2/pointOfInterest/{userName}/center")]
    //[ValidateModelState]
    //[SwaggerOperation("GetCenterOfPOIs")]
    //[SwaggerResponse(statusCode: 200, type: typeof(InlineResponse200), description: "Success")]
    //public virtual IActionResult GetCenterOfPOIs([FromRoute][Required] string userName)
    //{
    //  //TODO: Uncomment the next line to return response 200 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
    //  // return StatusCode(200, default(InlineResponse200));

    //  //TODO: Uncomment the next line to return response 404 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
    //  // return StatusCode(404);
    //  string exampleJson = null;
    //  exampleJson = "{\n  \"latitude\" : 0.8008281904610115,\n  \"longitude\" : 6.027456183070403\n}";

    //  var example = exampleJson != null
    //  ? JsonConvert.DeserializeObject<InlineResponse200>(exampleJson)
    //  : default(InlineResponse200);            //TODO: Change the data returned
    //  return new ObjectResult(example);
    //}

    /// <summary>
    /// Gets the poi to a given id
    /// </summary>
    /// <param name="poiID"></param>
    /// <response code="200">Success</response>
    /// <response code="404">Not found</response>
    [HttpGet]
    [Route("/pointOfInterest/{poiID}")]
    [ValidateModelState]
    [SwaggerOperation("GetPOI")]
    [SwaggerResponse(statusCode: 200, type: typeof(PointOfInterest), description: "Success")]
    public virtual IActionResult GetPOI([FromRoute][Required] Guid poiID)
    {
      var result = _dbContext.PointOfInterest.Find(poiID);
      if (result == null)
        return StatusCode(404);

      var json = JsonConvert.SerializeObject(result);
      return StatusCode(200, json);
    }

    /// <summary>
    /// Get all poi&#x27;s from the given user
    /// </summary>
    /// <param name="userName"></param>
    /// <response code="200">Success</response>
    /// <response code="404">User not found</response>
    [HttpGet]
    [Route("/pointOfInterest/getUserPoIs/{userName}")]
    [ValidateModelState]
    [SwaggerOperation("GetPOIs")]
    [SwaggerResponse(statusCode: 200, type: typeof(List<string>), description: "Success")]
    public virtual IActionResult GetPOIs([FromRoute][Required] string userName)
    {
      var results = from entries in _dbContext.PointOfInterest
                    where entries.Name == userName
                    select entries;
      if (!results.Any())
        return StatusCode(404);

      var pois = results.ToList();
      var json = JsonConvert.SerializeObject(pois);
      return StatusCode(200, json);
    }

    /// <summary>
    /// Edits the poi to a given id
    /// </summary>
    /// <param name="body"></param>
    /// <param name="poiID"></param>
    /// <response code="200">Success</response>
    /// <response code="400">Invalid input</response>
    /// <response code="404">Not found</response>
    [HttpPut]
    [Route("/pointOfInterest")]
    [ValidateModelState]
    [SwaggerOperation("PutPOI")]
    [SwaggerResponse(statusCode: 200, type: typeof(PointOfInterest), description: "Success")]
    public virtual IActionResult PutPOI([FromBody] PointOfInterest body)
    {
      var result = _dbContext.PointOfInterest.AsNoTracking().FirstOrDefault(entry => entry.Id == body.Id);
      if (result == null)
        return StatusCode(404);

      var success = _dbContext.PointOfInterest.Update(body);
      if (success.State != EntityState.Modified)
      {
        _logger.LogInformation($"Failed to update the PoI in the database! Item: {0} ", nameof(body), body);
        return StatusCode(500);
      }
      
      _dbContext.SaveChanges();
      return StatusCode(200);
    }
  }
}
