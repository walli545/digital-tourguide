using API.Helper;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
  public class VerificationController : ControllerBase
  {

    /// <summary>
    /// Add a new role request
    /// </summary>
    /// <param name="body"></param>
    [HttpPost]
    [Route("/api/verification")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public virtual async Task<IActionResult> RequestRole([FromBody][Required] RoleModel body)
    {
      throw new NotImplementedException();
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
    public virtual async Task<IActionResult> GetRequests()
    {
      throw new NotImplementedException();
    }

    /// <summary>
    /// Accept the role request of a specific user
    /// </summary>
    [HttpPost]
    [Route("/api/verification/accept/{userName}")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public virtual async Task<IActionResult> AcceptRequest([FromRoute][Required] string userName)
    {
      throw new NotImplementedException();
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
    public virtual async Task<IActionResult> DenyRequest([FromRoute][Required] string userName)
    {
      throw new NotImplementedException();
    }
  }
}
