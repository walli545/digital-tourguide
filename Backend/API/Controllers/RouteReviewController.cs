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
    public virtual async Task<IActionResult> AddRouteReview([FromBody][Required] PostRouteReview body)
    {
      try
      {
        var result = await _routeReviewService.AddRouteReview(body, User.GetName());
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
    /// Gets all reviews for the given route
    /// </summary>
    /// <param name="routeId">The id from the route</param>
    [HttpGet]
    [Route("/api/routereview/{routeId}")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<RouteReview>))]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AuthorizedRoles(Roles.User, Roles.Moderator, Roles.Creator)]
    public virtual async Task<IActionResult> GetRouteReviews([FromRoute][Required] Guid routeId)
    {
      try
      {
        var result = await _routeReviewService.GetRouteReviews(routeId);
        return Ok(result);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }

    /// <summary>
    /// Deletes the given review.
    /// </summary>
    /// <param name="reviewId">The id from the review to delete</param>
    [HttpDelete]
    [Route("/api/routereview/{reviewId}")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AuthorizedRoles(Roles.Moderator)]
    public virtual async Task<IActionResult> DeleteRouteReview([FromRoute][Required] Guid reviewId)
    {
      try
      {
        var result = await _routeReviewService.DeleteReview(reviewId);
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
