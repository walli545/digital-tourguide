using API.Helper;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
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
  public class RouteController : Controller
  {
    private readonly IRouteService _routeService;

    public RouteController(IRouteService routeService)
    {
      _routeService = routeService ?? throw new ArgumentNullException("Context was null!", nameof(routeService));
    }

    /// <summary>
    /// Add a new route to the database
    /// </summary>
    /// <param name="body"></param>
    /// <response code="200">Success</response>
    /// <response code="400">Invalid input</response>
    [HttpPost]
    [Route("/api/route")]
    [ValidateModelState]
    [SwaggerOperation("AddRoute")]
    [SwaggerResponse(statusCode: 200, type: typeof(Route), description: "Success")]
    public virtual async Task<IActionResult> AddRouteAsync([FromBody] PostRoute body)
    {
      try
      {
        var result = await _routeService.AddRoute(body);
        if (result == null)
          return StatusCode(400);

        var json = JsonConvert.SerializeObject(result);
        return StatusCode(200, json);
      }
      catch (Exception)
      {
        return StatusCode(500);
      }
    }

    /// <summary>
    /// Deletes the route to a given id
    /// </summary>
    /// <param name="routeID"></param>
    /// <response code="200">Success</response>
    /// <response code="404">Not found</response>
    [HttpDelete]
    [Route("/api/route/{routeID}")]
    [ValidateModelState]
    [SwaggerOperation("DeleteRoute")]
    public virtual async Task<IActionResult> DeleteRoute([FromRoute][Required] Guid routeID)
    {
      try
      {
        var result = await _routeService.DeleteRoute(routeID);
        if (result == 0)
          return StatusCode(404);
        return StatusCode(200);
      }
      catch (Exception)
      {
        return StatusCode(500);
      }
    }

    /// <summary>
    /// Gets the route to a given id
    /// </summary>
    /// <param name="routeID"></param>
    /// <response code="200">Success</response>
    /// <response code="404">Not found</response>
    [HttpGet]
    [Route("/api/route/{routeID}")]
    [ValidateModelState]
    [SwaggerOperation("GetRoute")]
    [SwaggerResponse(statusCode: 200, type: typeof(Route), description: "Success")]
    public virtual async Task<IActionResult> GetRoute([FromRoute][Required] Guid routeID)
    {
      try
      {
        var result = await _routeService.GetRoute(routeID);
        if (result == null)
          return StatusCode(404);

        var json = JsonConvert.SerializeObject(result);
        return StatusCode(200, json);
      }
      catch(Exception)
      {
        return StatusCode(500);
      }
    }

    /// <summary>
    /// Get all routes from the given user
    /// </summary>
    /// <param name="creatorName"></param>
    /// <response code="200">Success</response>
    /// <response code="404">User not found</response>
    [HttpGet]
    [Route("/api/routes/{creatorName}")]
    [ValidateModelState]
    [SwaggerOperation("GetRoutes")]
    [SwaggerResponse(statusCode: 200, type: typeof(List<string>), description: "Success")]
    public virtual async Task<IActionResult> GetRoutes([FromRoute][Required] string creatorName)
    {
      try
      {
        var result = await _routeService.GetAllRoutes(creatorName);
        if (result == null)
          return StatusCode(404);

        var json = JsonConvert.SerializeObject(result);
        return StatusCode(200, json);
      }
      catch (Exception)
      {
        return StatusCode(500);
      }
    }

    /// <summary>
    /// Edits the route to a given id
    /// </summary>
    /// <param name="body"></param>
    /// <response code="200">Success</response>
    /// <response code="400">Invalid input</response>
    /// <response code="404">Not found</response>
    [HttpPut]
    [Route("/api/route")]
    [ValidateModelState]
    [SwaggerOperation("PutRoute")]
    public virtual async Task<IActionResult> PutRoute([FromBody] PostRoute body)
    {
      throw new NotImplementedException();
    }
  }
}
