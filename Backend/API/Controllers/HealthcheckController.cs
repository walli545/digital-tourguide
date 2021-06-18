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

using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace API.Controllers
{
  [ApiController]
  public class HealthcheckController : ControllerBase
  {

    //_logger.LogInformation("Hello World Logging :)");

    private readonly ILogger<HealthcheckController> _logger;

    public HealthcheckController(ILogger<HealthcheckController> logger)
    {
      _logger = logger ?? throw new ArgumentNullException("logger was null!", nameof(logger)); ;
    }

    /// <summary>
    /// Return 200 ok.
    /// </summary>
    /// <response code="200">Success</response>
    [HttpGet]
    [Route("/api/Healthcheck")]
    public ActionResult Healthcheck()
    {
      return Ok("Hi from the Backend");
    }

    /// <summary>
    /// Return 200 ok.
    /// </summary>
    /// <response code="200">Success</response>
    [HttpGet]
    [Route("/api/me")]
    [AuthorizedRoles(Roles.User)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Me))]
    public ActionResult GetMe()
    {
      var me = new Me();
      me.id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
      me.name = User.FindFirst(ClaimTypes.GivenName).Value;

      return Ok(me);
    }

    private class Me{
      public string id { get; set; }
      public string name { get; set; }
    }

  }
}
