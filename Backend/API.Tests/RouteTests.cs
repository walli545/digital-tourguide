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
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

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

      service.Setup(x => x.AddRoute(post, It.IsAny<string>())).ReturnsAsync((Route)null);
      var controller = new RouteController(service.Object);

      controller.ControllerContext = new ControllerContext()
      {
        HttpContext = new DefaultHttpContext() { User = CreateMockUser("content-creator") }
      };

      var result = await controller.AddRoute(post) as StatusCodeResult;

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
      var testAverage = 5;
      var testRatings = 10;

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
        AverageRating = testAverage,
        NumberOfRatings = testRatings
      };

      service.Setup(x => x.AddRoute(It.IsAny<PostRoute>(), It.IsAny<string>())).ReturnsAsync(returnRoute);
      var controller = new RouteController(service.Object);

      controller.ControllerContext = new ControllerContext()
      {
        HttpContext = new DefaultHttpContext() { User = CreateMockUser("content-creator") }
      };

      var results = await controller.AddRoute(new PostRoute()) as ObjectResult;

      var returns = results.Value as Route;

      Assert.Equal(200, results.StatusCode);
      Assert.Equal(returns.RouteID, testID);
      Assert.Equal(returns.CreatorName, testCreator);
      Assert.Equal(returns.Description, testDescription);
      Assert.Equal(returns.Duration, testDuration);
      Assert.Equal(returns.Polyline, testLine);
      Assert.Equal(returns.Name, testName);
      Assert.Equal(returns.AverageRating, testAverage);
      Assert.Equal(returns.NumberOfRatings, testRatings);
    }

    [Fact]
    public async Task DeleteNotExistingRouteTest()
    {
      // arrange
      var service = new Mock<IRouteService>();

      service.Setup(x => x.DeleteRoute(It.IsAny<Guid>())).ReturnsAsync(0);
      var controller = new RouteController(service.Object);

      var result = await controller.DeleteRoute(Guid.NewGuid()) as StatusCodeResult;

      Assert.Equal(404, result.StatusCode);
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

      Assert.Equal(204, result.StatusCode);
    }

    [Fact]
    public async Task GetNotExistingRoute()
    {
      // arrange
      var service = new Mock<IRouteService>();

      service.Setup(x => x.GetRoute(It.IsAny<Guid>())).ReturnsAsync((Route)null);
      var controller = new RouteController(service.Object);

      var result = await controller.GetRoute(Guid.NewGuid()) as StatusCodeResult;

      Assert.Equal(404, result.StatusCode);
    }

    [Fact]
    public async Task GetRouteWithNotExistingPoI()
    {
      // arrange
      var service = new Mock<IRouteService>();

      service.Setup(x => x.GetRoute(It.IsAny<Guid>())).Throws(new Exception());
      var controller = new RouteController(service.Object);

      var result = await controller.GetRoute(Guid.NewGuid()) as StatusCodeResult;

      Assert.Equal(500, result.StatusCode);
    }

    [Fact]
    public async Task GetExistingRoute()
    {
      var testID = Guid.NewGuid();
      var testName = "testName";
      var testCreator = "testCreator";
      var testDescription = "testDescription";
      float testDuration = 0.0f;
      var testLine = "testPoly";
      var testAverage = 5;
      var testRatings = 10;

      var poiId = Guid.NewGuid();
      var returnPoI = new PointOfInterest()
      {
        PoIID = poiId,
      };

      var testList = new List<PointOfInterest>()
      {
        returnPoI
      };

      var testRoute = new Route()
      {
        RouteID = testID,
        CreatorName = testCreator,
        Description = testDescription,
        Duration = testDuration,
        Name = testName,
        PointOfInterests = testList,
        Polyline = testLine,
        AverageRating = testAverage,
        NumberOfRatings = testRatings
      };

      // arrange
      var service = new Mock<IRouteService>();

      service.Setup(x => x.GetRoute(testID)).ReturnsAsync(testRoute);
      var controller = new RouteController(service.Object);

      var result = await controller.GetRoute(testID) as ObjectResult;

      var returns = result.Value as Route;

      var poiID = returns.PointOfInterests.FirstOrDefault(x => x.PoIID == poiId).PoIID;
      Assert.Equal(poiId, poiID);

      Assert.Equal(200, result.StatusCode);
      Assert.Equal(returns.RouteID, testID);
      Assert.Equal(returns.CreatorName, testCreator);
      Assert.Equal(returns.Description, testDescription);
      Assert.Equal(returns.Duration, testDuration);
      Assert.Equal(returns.Polyline, testLine);
      Assert.Equal(returns.Name, testName);
      Assert.Equal(returns.AverageRating, testAverage);
      Assert.Equal(returns.NumberOfRatings, testRatings);
    }

    [Fact]
    public async Task GetRouteFromExistingCreator()
    {
      var service = new Mock<IRouteService>();

      string creator1 = "testCreator1";
      string creator2 = "testCreator2";

      var route1 = new Route()
      {
        CreatorName = creator1
      };
      var route2 = new Route()
      {
        CreatorName = creator2
      };
      var route3 = new Route()
      {
        CreatorName = creator1
      };

      var routes = new List<Route>()
      {
        route1,
        route2,
        route3
      };

      service.Setup(x => x.GetAllRoutes(creator1)).ReturnsAsync(routes.Where(route => route.CreatorName == creator1).ToList());

      var controller = new RouteController(service.Object);

      // Act
      var results = await controller.GetRoutes(creator1) as ObjectResult;
      var returns = results.Value as List<Route>;

      // Assert
      Assert.Equal(2, returns.Count);
    }

    [Fact]
    public async Task GetRouteFromNonExistingCreator()
    {
      var service = new Mock<IRouteService>();

      string creator1 = "testCreator1";
      string creator2 = "testCreator2";
      string creator3 = "testCreator2";

      var route1 = new Route()
      {
        CreatorName = creator1
      };
      var route2 = new Route()
      {
        CreatorName = creator2
      };
      var route3 = new Route()
      {
        CreatorName = creator1
      };

      var routes = new List<Route>()
      {
        route1,
        route2,
        route3
      };

      service.Setup(x => x.GetAllRoutes(creator3)).ReturnsAsync((List<Route>)null);

      var controller = new RouteController(service.Object);

      // Act
      var results = await controller.GetRoutes(creator3) as StatusCodeResult;

      Assert.Equal(404, results.StatusCode);
    }

    [Fact]
    public async Task GetRouteWithInternalError()
    {
      var service = new Mock<IRouteService>();

      string creator1 = "testCreator1";
      string creator2 = "testCreator2";
      string creator3 = "testCreator2";

      var route1 = new Route()
      {
        CreatorName = creator1
      };
      var route2 = new Route()
      {
        CreatorName = creator2
      };
      var route3 = new Route()
      {
        CreatorName = creator1
      };

      var routes = new List<Route>()
      {
        route1,
        route2,
        route3
      };

      service.Setup(x => x.GetAllRoutes(It.IsAny<string>())).Throws(new Exception());

      var controller = new RouteController(service.Object);

      // Act
      var results = await controller.GetRoutes(creator3) as StatusCodeResult;

      Assert.Equal(500, results.StatusCode);
    }

    [Fact]
    public async Task PutNotExistingRoute()
    {
      var service = new Mock<IRouteService>();

      service.Setup(x => x.PutRoute(It.IsAny<PutRoute>(), It.IsAny<string>())).ReturnsAsync(0);

      var controller = new RouteController(service.Object);
      controller.ControllerContext = new ControllerContext()
      {
        HttpContext = new DefaultHttpContext() { User = CreateMockUser("content-creator") }
      };

      var results = await controller.PutRoute(new PutRoute()) as StatusCodeResult;

      Assert.Equal(404, results.StatusCode);
    }

    private ClaimsPrincipal CreateMockUser(string role)
    {
      return new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
      {
        new Claim(ClaimTypes.GivenName, "example name"),
        new Claim(ClaimTypes.NameIdentifier, "1"),
        new Claim("role", role),
      }, "mock"));
    }

    [Fact]
    public async Task PutExistingRoute()
    {
      var service = new Mock<IRouteService>();

      service.Setup(x => x.PutRoute(It.IsAny<PutRoute>(), It.IsAny<string>())).ReturnsAsync(1);

      var controller = new RouteController(service.Object);

      controller.ControllerContext = new ControllerContext()
      {
        HttpContext = new DefaultHttpContext() { User = CreateMockUser("content-creator") }
      };

      var results = await controller.PutRoute(new PutRoute()) as StatusCodeResult;

      Assert.Equal(204, results.StatusCode);
    }
  }
}
