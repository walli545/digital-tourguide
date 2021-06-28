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
  public class PoIReviewController : Controller
  {
    private readonly IPointOfInterestReviewService _poiReviewService;

    public PoIReviewController(IPointOfInterestReviewService poiReviewService)
    {
      _poiReviewService = poiReviewService ?? throw new ArgumentNullException(nameof(poiReviewService), "Context was null!");
    }

    /// <summary>
    /// Add a new review for a poi
    /// </summary>
    /// <param name="body"></param>
    [HttpPost]
    [Route("/api/poireview")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AuthorizedRoles(Roles.User, Roles.Moderator, Roles.Creator)]
    public virtual async Task<IActionResult> AddPoIReview([FromBody][Required] PostPoIReview body)
    {
      try
      {
        var result = await _poiReviewService.AddPoIReview(body, User.GetName());
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
    /// Gets all reviews for the given poi
    /// </summary>
    /// <param name="poiId">The id from the poi</param>
    [HttpGet]
    [Route("/api/poireview/{poiId}")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<PoIReview>))]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AuthorizedRoles(Roles.User, Roles.Moderator, Roles.Creator)]
    public virtual async Task<IActionResult> GetPoIReviews([FromRoute][Required] Guid poiId)
    {
      try
      {
        var result = await _poiReviewService.GetPoIReviews(poiId);
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
    /// <param name="poiId">The id from the review to delete</param>
    [HttpDelete]
    [Route("/api/poireview/{poiId}")]
    [ValidateModelState]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AuthorizedRoles(Roles.Moderator)]
    public virtual async Task<IActionResult> DeletePoIReview([FromRoute][Required] Guid poiId)
    {
      try
      {
        var result = await _poiReviewService.DeleteReview(poiId);
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
