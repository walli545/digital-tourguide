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
  public class RouteReviewController : Controller
  {
    private readonly IRouteReviewService _routeReviewService;

    public RouteReviewController(IRouteReviewService routeReviewService)
    {
      _routeReviewService = routeReviewService ?? throw new ArgumentNullException(nameof(routeReviewService), "Context was null!");
    }

    /// <summary>
    /// Add a new review for a route
    /// </summary>
    /// <param name="body"></param>
    [HttpPost]
    [Route("/api/routereview")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AuthorizedRoles(Roles.User, Roles.Moderator, Roles.Creator)]
    public virtual async Task<IActionResult> AddRoleReview([FromBody][Required] PostRouteReview body)
    {
      try
      {
        var result = await _routeReviewService.AddRouteReview(body);
        if (result == 0)
          return NotFound();

        return NoContent();
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }
    
    //TODO: missing at least a delete for the moderators. 
  }
}
