using API.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using API.Models;
using API.Controllers;
using Microsoft.AspNetCore.Mvc;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace API.Tests
{
  public class RouteTests
  {
    [Fact]
    public async Task AddRouteWithWrongBodyTest()
    {
      // arrange
      var service = new Mock<IRouteService>();

      var post = new PostRoute();

      service.Setup(x => x.AddRoute(post)).ReturnsAsync((Route)null);
      var controller = new RouteController(service.Object);

      var result = await controller.AddRouteAsync(post) as StatusCodeResult;

      Assert.Equal(400, result.StatusCode);
    }

    [Fact]
    public async Task AddRouteTest()
    {
      // arrange
      var service = new Mock<IRouteService>();

      var testID = Guid.NewGuid();

      var testName = "testName";
      var testCreator = "testCreator";
      var testDescription = "testDescription";
      float testDuration = 0.0f;
      var testLine = "testPoly";

      var poiId = Guid.NewGuid();
      var returnPoI = new PointOfInterest()
      {
        PoIID = poiId,
      };

      var testList = new List<PointOfInterest>()
      {
        returnPoI
      };

      var returnRoute = new Route()
      {
        RouteID = testID,
        CreatorName = testCreator,
        Description = testDescription,
        Duration = testDuration,
        Name = testName,
        PointOfInterests = testList,
        Polyline = testLine,
      };

      service.Setup(x => x.AddRoute(It.IsAny<PostRoute>())).ReturnsAsync(returnRoute);
      var controller = new RouteController(service.Object);

      var results = await controller.AddRouteAsync(new PostRoute()) as ObjectResult;


      var returns = results.Value;
      var data = (JObject)JsonConvert.DeserializeObject(returns.ToString());

      var guid = data["routeId"].Value<string>();
      Guid id = Guid.Parse(guid);
      var name = data["name"].Value<string>();
      var description = data["description"].Value<string>();
      var creatorName = data["creatorName"].Value<string>();
      var duration = data["duration"].Value<float>();
      var polyline = data["polyline"].Value<string>();

      Assert.Equal(200, results.StatusCode);
      Assert.Equal(id, testID);
      Assert.Equal(creatorName, testCreator);
      Assert.Equal(description, testDescription);
      Assert.Equal(duration, testDuration);
      Assert.Equal(polyline, testLine);
      Assert.Equal(name, testName);
    }

    [Fact]
    public async Task DeleteNotExistingRouteTest()
    {
      // arrange
      var service = new Mock<IRouteService>();

      service.Setup(x => x.DeleteRoute(It.IsAny<Guid>())).ReturnsAsync(0);
      var controller = new RouteController(service.Object);

      var result = await controller.DeleteRoute(Guid.NewGuid()) as StatusCodeResult;

      Assert.Equal(404, result.StatusCode) ;
    }

    [Fact]
    public async Task DeleteRouteExceptionTest()
    {
      // arrange
      var service = new Mock<IRouteService>();

      service.Setup(x => x.DeleteRoute(It.IsAny<Guid>())).Throws(new Exception());
      var controller = new RouteController(service.Object);

      var result = await controller.DeleteRoute(Guid.NewGuid()) as StatusCodeResult;

      Assert.Equal(500, result.StatusCode);
    }

    [Fact]
    public async Task DeleteRouteTest()
    {
      // arrange
      var service = new Mock<IRouteService>();

      service.Setup(x => x.DeleteRoute(It.IsAny<Guid>())).ReturnsAsync(2);
      var controller = new RouteController(service.Object);

      var result = await controller.DeleteRoute(Guid.NewGuid()) as StatusCodeResult;

      Assert.Equal(200, result.StatusCode);
    }
  }
}
