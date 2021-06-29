using API.Controllers;
using API.Models;
using API.Services;
using GenFu;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Xunit;

namespace API.Tests
{
  /// <summary>
  /// Tests for the PoI Endpoint
  /// </summary>
  public class PointOfInterestTests
  {
    private List<PointOfInterest> GetFakeData(int size)
    {
      var pois = A.ListOf<PointOfInterest>(size);
      pois.ForEach(x => x.PoIID = Guid.NewGuid());
      return pois;
    }

    /// <summary>
    /// Tests functionality when querying for POIs from a specific username.
    /// </summary>
    /// <returns></returns>
    [Fact]
    public async Task GetPoIsFromUsernameTest()
    {
      // arrange
      var service = new Mock<IPointOfInterestService>();

      var usernameA = "example name";
      var usernameB = "testUserB";
      int size = 10;
      var pois = GetFakeData(size);
      pois[0].UserName = usernameA;
      pois[1].UserName = usernameB;
      pois[2].UserName = usernameA;

      service.Setup(x => x.GetAllPoIs(usernameA)).ReturnsAsync(pois.Where(poi => poi.UserName == usernameA).ToList());
      var controller = new PointOfInterestController(service.Object);
      controller.ControllerContext = new ControllerContext()
      {
        HttpContext = new DefaultHttpContext() { User = CreateMockUser("promoter") }
      };

      // Act
      var results = await controller.GetPOIs(usernameA) as ObjectResult;
      var returns = results.Value as List<PointOfInterest>;
      

      // Assert
      Assert.Equal(2, returns.Count);
    }

    [Fact]
    public async Task GetPoIFromIdTest()
    {
      // arrange
      var service = new Mock<IPointOfInterestService>();


      int size = 10;
      var pois = GetFakeData(size);
      var poi = pois[0];
      var searchID = poi.PoIID;

      var testname = "testName";
      var testdescription = "testDescription";
      pois[0].Name = testname;
      pois[0].Description = testdescription;


      service.Setup(x => x.GetPoI(searchID)).ReturnsAsync(poi);
      var controller = new PointOfInterestController(service.Object);


      controller.ControllerContext = new ControllerContext()
      {
        HttpContext = new DefaultHttpContext() { User = CreateMockUser("promoter") }
      };

      // Act
      var results = await controller.GetPOI(searchID) as ObjectResult;
      var returns = results.Value as PointOfInterest;

      // Assert
      Assert.Equal(returns.PoIID, searchID);
      Assert.Equal(returns.Name, testname);
      Assert.Equal(returns.Description, testdescription);
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
    public async Task AddPoITest()
    {
      // arrange
      var service = new Mock<IPointOfInterestService>();

      var testname = "testName";
      var userName = "example name";
      var testdescription = "testDescription";
      var testUrl = "testUrl";
      var lat = 10;
      var longi = 20;
      var id = Guid.NewGuid();
      var testRatings = 5;
      var testAverage = 3;
      var testPromoted = true;

      var returnPoI = new PointOfInterest()
      {
        PoIID = id,
        Name = testname,
        Description = testdescription,
        Latitude = lat,
        Longitude = longi,
        ImageUrl = testUrl,
        AverageRating = testAverage,
        IsPromoted = testPromoted,
        NumberOfRatings = testRatings,
        UserName = userName
      };

      var postPoI = new PostPointOfInterest()
      {
        Name = testname,
        Description = testdescription,
        Latitude = lat,
        Longitude = longi,
        ImageUrl = testUrl
      };

      service.Setup(x => x.AddPoI(postPoI, userName, true)).ReturnsAsync(returnPoI);
      var controller = new PointOfInterestController(service.Object);


      controller.ControllerContext = new ControllerContext()
      {
        HttpContext = new DefaultHttpContext() { User = CreateMockUser("promoter") }
      };

      // Act
      var results = await controller.AddPOI(postPoI) as ObjectResult;
      var returns = results.Value as PointOfInterest;

      // Assert
      Assert.Equal(returns.PoIID, returnPoI.PoIID);
      Assert.Equal(returns.Name, returnPoI.Name);
      Assert.Equal(returns.Description, returnPoI.Description);
      Assert.Equal(returns.Latitude, returnPoI.Latitude);
      Assert.Equal(returns.Longitude, returnPoI.Longitude);
      Assert.Equal(returns.ImageUrl, returnPoI.ImageUrl);
      Assert.Equal(returns.UserName, returnPoI.UserName);
      Assert.Equal(returns.NumberOfRatings, returnPoI.NumberOfRatings);
      Assert.Equal(returns.IsPromoted, returnPoI.IsPromoted);
      Assert.Equal(returns.AverageRating, returnPoI.AverageRating);
    }
  }
}