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
  public class MeController : ControllerBase
  {

    //_logger.LogInformation("Hello World Logging :)");

    private readonly ILogger<MeController> _logger;

    public MeController(ILogger<MeController> logger)
    {
      _logger = logger ?? throw new ArgumentNullException("logger was null!", nameof(logger)); ;
    }

    /// <summary>
    /// Return 200 ok.
    /// </summary>
    /// <response code="200">Success</response>
    [HttpGet]
    [Route("/api/me")]
    [AuthorizedRoles(Roles.User, Roles.Moderator, Roles.Creator, Roles.Promoter, Roles.Admin)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Me))]
    public ActionResult GetMe()
    {
      var me = new Me();
      me.id = User.GetID();
      me.name = User.GetName();
      me.roles = User.GetRoles();

      return Ok(me);
    }

    private class Me{
      public string id { get; set; }
      public string name { get; set; }
      public List<string> roles { get; set; }
    }

  }
}
