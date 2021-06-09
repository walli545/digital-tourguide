﻿using API.Helper;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Http;
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
      _routeService = routeService ?? throw new ArgumentNullException(nameof(routeService), "Context was null!");
    }

    /// <summary>
    /// Add a new route to the database
    /// </summary>
    /// <param name="body"></param>
    [HttpPost]
    [Route("/api/route")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Route))]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public virtual async Task<IActionResult> AddRoute([FromBody][Required] PostRoute body)
    {
      try
      {
        var result = await _routeService.AddRoute(body);
        if (result == null)
          return StatusCode(400);

        var json = JsonConvert.SerializeObject(result);
        return StatusCode(200, json);
      }
      catch (ArgumentException)
      {
        return StatusCode(404);
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
    [HttpDelete]
    [Route("/api/route/{routeID}")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public virtual async Task<IActionResult> DeleteRoute([FromRoute][Required] Guid routeID)
    {
      try
      {
        var result = await _routeService.DeleteRoute(routeID);
        if (result == 0)
          return NotFound();
        return NoContent();
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
    [HttpGet]
    [Route("/api/route/{routeID}")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Route))]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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
      catch (Exception)
      {
        return StatusCode(500);
      }
    }

    /// <summary>
    /// Get all routes from the given user
    /// </summary>
    /// <param name="creatorName"></param>
    [HttpGet]
    [Route("/api/routes/{creatorName}")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Route>))]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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
    [HttpPut]
    [Route("/api/route")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public virtual async Task<IActionResult> PutRoute([FromBody][Required] PutRoute body)
    {
      var result = await _routeService.PutRoute(body);
      if (result == 0)
        return StatusCode(404);

      return NoContent();
    }
  }
}