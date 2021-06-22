using API.Helper;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
  [ApiController]
  public class PointOfInterestController : ControllerBase
  {
    private readonly IPointOfInterestService _poiService;

    public PointOfInterestController(IPointOfInterestService poiService)
    {
      _poiService = poiService ?? throw new ArgumentNullException(nameof(poiService), "Context was null!");
    }

    /// <summary>
    /// Add a new poi to the database
    /// </summary>
    /// <param name="body"></param>
    [HttpPost]
    [Route("/api/pointOfInterest")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PointOfInterest))]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AuthorizedRoles(Roles.Creator, Roles.Promoter)]
    public virtual async Task<IActionResult> AddPOI([FromBody][Required] PostPointOfInterest body)
    {
      try
      {
        var result = await _poiService.AddPoI(body);
        if (result == null)
          return StatusCode(400);

        return Ok(result);
      }
      catch (Exception)
      {
        return StatusCode(500);
      }
    }

    /// <summary>
    /// Deletes the poi to a given id
    /// </summary>
    /// <param name="poiID">the poiID to delete</param>
    [HttpDelete]
    [Route("/api/pointOfInterest/{poiID}")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AuthorizedRoles(Roles.Creator, Roles.Promoter)]
    public virtual async Task<IActionResult> DeletePOI([FromRoute][Required] Guid poiID)
    {
      try
      {
        var result = await _poiService.DeletePoI(poiID);
        if (result == 0)
          return StatusCode(404);
        return NoContent();
      }
      catch (Exception)
      {
        return StatusCode(500);
      }
    }

    /// <summary>
    /// Get the center of all poi&#x27;s from the given user
    /// </summary>
    /// <param name="userName"></param>
    /// <response code="200">Success</response> 
    /// <response code="404">User not found</response>
    [HttpGet]
    [Route("/api/pointOfInterest/{userName}/center")] // warum muss ich username übergeben das will ich nur für mich selber wissen oder ? 
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CenterResult))]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [AuthorizedRoles(Roles.Creator, Roles.Promoter)]
    public virtual async Task<IActionResult> GetCenterOfPOIsAsync([FromRoute][Required] string userName)
    {
      var result = await _poiService.GetCenter(userName);
      if (result == null)
        return NotFound();

      return Ok(result);
    }

    /// <summary>
    /// Gets the poi to a given id
    /// </summary>
    /// <param name="poiID"></param>
    [HttpGet]
    [Route("/api/pointOfInterest/{poiID}")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PointOfInterest))]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [AuthorizedRoles(Roles.Creator, Roles.Promoter, Roles.User, Roles.Moderator)]
    public virtual async Task<IActionResult> GetPOI([FromRoute][Required] Guid poiID)
    {
      var result = await _poiService.GetPoI(poiID);
      if (result == null)
        return StatusCode(404);

      return Ok(result);
    }

    /// <summary>
    /// Get all poi&#x27;s from the given user
    /// </summary>
    /// <param name="userName"></param>
    [HttpGet]
    [Route("/api/pointOfInterest/getUserPoIs/{userName}")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<PointOfInterest>))]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [AuthorizedRoles(Roles.Creator, Roles.Promoter, Roles.Moderator, Roles.User)]
    public virtual async Task<IActionResult> GetPOIs([FromRoute][Required] string userName)
    {
      var results = await _poiService.GetAllPoIs(userName);
      if (results.Count == 0)
        return StatusCode(404);

      return Ok(results);
    }

    /// <summary>
    /// Edits the poi to a given id
    /// </summary>
    /// <param name="body"></param>
    [HttpPut]
    [Route("/api/pointOfInterest")]
    [ValidateModelState]
    [SwaggerOperation("PutPOI")]
    [SwaggerResponse(statusCode: 200, type: typeof(PointOfInterest), description: "Success")]
    [AuthorizedRoles(Roles.Creator, Roles.Promoter)]
    public virtual async Task<IActionResult> PutPOI([FromBody][Required] PutPointOfInterest body)
    {
      var result = await _poiService.PutPoI(body);
      if (result == 0)
        return StatusCode(404);

      return StatusCode(200);
    }
  }
}