using API.Helper;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
  [ApiController]
  public class VerificationController : Controller
  {
    private readonly IRoleRequestService _requestService;

    public VerificationController(IRoleRequestService routeService)
    {
      _requestService = routeService ?? throw new ArgumentNullException(nameof(routeService), "Context was null!");
    }

    /// <summary>
    /// Add a new role request
    /// </summary>
    /// <param name="body"></param>
    [HttpPost]
    [Route("/api/verification")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AuthorizedRoles(Roles.User, Roles.Moderator, Roles.Creator, Roles.Promoter, Roles.Admin)]
    public virtual async Task<IActionResult> RequestRole([FromBody][Required] RoleModel body)
    {
      try
      {
        bool success = await _requestService.AddRequest(body);
        if (!success)
          return BadRequest(); // already exists.

        return NoContent();
      }
      catch (Exception ex)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }

    /// <summary>
    /// Fetch all open role requests
    /// </summary>
    [HttpGet]
    [Route("/api/verification/requests")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<RoleModel>))]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AuthorizedRoles(Roles.Admin)]
    public virtual async Task<IActionResult> GetRequests()
    {
      try
      {
        var results = await _requestService.GetRequests();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }

    /// <summary>
    /// Accept the role request of a specific user
    /// </summary>
    [HttpPost]
    [Route("/api/verification/accept/{userName}")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AuthorizedRoles(Roles.Admin)]
    public virtual async Task<IActionResult> AcceptRequest([FromRoute][Required] string userName)
    {
      try
      {
        var result = await _requestService.Accept(userName);
        if (result == 0)
          return NotFound();

        return NoContent();
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }

    /// <summary>
    /// Reject the role request of a specific user
    /// </summary>
    [HttpPost]
    [Route("/api/verification/deny/{userName}")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AuthorizedRoles(Roles.Admin)]
    public virtual async Task<IActionResult> DenyRequest([FromRoute][Required] string userName)
    {
      try
      {
        var result = await _requestService.Deny(userName);
        if (result == 0)
          return NotFound();

        return NoContent();
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }
  }
}
