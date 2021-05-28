using API.Helper;
using API.Models;
using Microsoft.AspNetCore.Mvc;
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
    public virtual async Task<IActionResult> AddRoute([FromBody] PostRoute body)
    {
      throw new NotImplementedException();
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
    public virtual async Task<IActionResult> DeleteRoute([FromRoute][Required] string routeID)
    {
      throw new NotImplementedException();
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
    public virtual async Task<IActionResult> GetRoute([FromRoute][Required] string routeID)
    {
      throw new NotImplementedException();
    }

    /// <summary>
    /// Get all routes from the given user
    /// </summary>
    /// <param name="userName"></param>
    /// <response code="200">Success</response>
    /// <response code="404">User not found</response>
    [HttpGet]
    [Route("/api/routes/{userName}")]
    [ValidateModelState]
    [SwaggerOperation("GetRoutes")]
    [SwaggerResponse(statusCode: 200, type: typeof(List<string>), description: "Success")]
    public virtual async Task<IActionResult> GetRoutes([FromRoute][Required] string userName)
    {
      throw new NotImplementedException();
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
