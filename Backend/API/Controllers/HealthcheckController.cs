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

namespace API.Controllers
{
  [ApiController]
  [Route("[controller]")]
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
    [ValidateModelState] // what is that ? 
    public ActionResult Healthcheck()
    {
      return Ok("Hi from the Backend");
    }
  }
}
