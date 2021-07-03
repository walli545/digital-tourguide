using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
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

  }
}
