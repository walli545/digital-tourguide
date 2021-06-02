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

      var results = await controller.AddRoute(new PostRoute()) as ObjectResult;


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

      Assert.Equal(200, result.StatusCode);
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
      };


      // arrange
      var service = new Mock<IRouteService>();

      service.Setup(x => x.GetRoute(testID)).ReturnsAsync(testRoute);
      var controller = new RouteController(service.Object);

      var result = await controller.GetRoute(testID) as ObjectResult;

      var returns = result.Value;
      var data = (JObject)JsonConvert.DeserializeObject(returns.ToString());

      var guid = data["routeId"].Value<string>();
      Guid id = Guid.Parse(guid);
      var name = data["name"].Value<string>();
      var description = data["description"].Value<string>();
      var creatorName = data["creatorName"].Value<string>();
      var duration = data["duration"].Value<float>();
      var polyline = data["polyline"].Value<string>();

      var poiArray = data.Children<JProperty>().FirstOrDefault(x => x.Name == "pointOfInterests").Value;

      var item = poiArray.Children().FirstOrDefault();
      var itemProperties = item.Children<JProperty>();
      var poiID = itemProperties.FirstOrDefault(x => x.Name == "poiId");
      var poiIDValue = poiID.Value;
      Assert.Equal(Guid.Parse(poiIDValue.Value<string>()), poiId);

      Assert.Equal(200, result.StatusCode);
      Assert.Equal(id, testID);
      Assert.Equal(creatorName, testCreator);
      Assert.Equal(description, testDescription);
      Assert.Equal(duration, testDuration);
      Assert.Equal(polyline, testLine);
      Assert.Equal(name, testName);
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
      var returns = results.Value;
      var ob = JsonConvert.DeserializeObject(returns.ToString()) as JArray;

      // Assert
      Assert.Equal(2, ob.Count);
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

      service.Setup(x => x.PutRoute(It.IsAny<PutRoute>())).ReturnsAsync(0);

      var controller = new RouteController(service.Object);

      var results = await controller.PutRoute(new PutRoute()) as StatusCodeResult;

      Assert.Equal(404, results.StatusCode);
    }


    [Fact]
    public async Task PutExistingRoute()
    {
      var service = new Mock<IRouteService>();

      service.Setup(x => x.PutRoute(It.IsAny<PutRoute>())).ReturnsAsync(1);

      var controller = new RouteController(service.Object);

      var results = await controller.PutRoute(new PutRoute()) as StatusCodeResult;

      Assert.Equal(200, results.StatusCode);
    }
  }
}
