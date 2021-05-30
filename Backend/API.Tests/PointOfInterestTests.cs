using API.Controllers;
using API.Models;
using API.Services;
using GenFu;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
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

      var usernameA = "testUserA";
      var usernameB = "testUserB";
      int size = 10;
      var pois = GetFakeData(size);
      pois[0].Name = usernameA;
      pois[1].Name = usernameB;
      pois[2].Name = usernameA;
      
      service.Setup(x => x.GetAllPoIs(usernameA)).ReturnsAsync(pois.Where(poi => poi.Name == usernameA).ToList());
      var controller = new PointOfInterestController(service.Object);

      // Act
      var results = await controller.GetPOIsAsync(usernameA) as ObjectResult;
      var returns = results.Value;
      var ob = JsonConvert.DeserializeObject(returns.ToString()) as JArray;

      // Assert
      Assert.Equal(2, ob.Count);
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

      // Act
      var results = await controller.GetPOIAsync(searchID) as ObjectResult;
      var returns = results.Value;
      var data = (JObject)JsonConvert.DeserializeObject(returns.ToString());

      string guid = data["poiId"].Value<string>();
      Guid gu = Guid.Parse(guid);
      string name = data["name"].Value<string>();
      string description = data["description"].Value<string>();

      // Assert
      Assert.Equal(gu, searchID);
      Assert.Equal(name, testname);
      Assert.Equal(description, testdescription);
    }

    [Fact]
    public async Task AddPoITest()
    {
      // arrange
      var service = new Mock<IPointOfInterestService>();

      var testname = "testName";
      var testdescription = "testDescription";
      var testUrl = "testUrl";
      var lat = 10;
      var longi = 20;
      var id = Guid.NewGuid();
      var returnPoI = new PointOfInterest()
      {
        PoIID = id,
        Name = testname,
        Description = testdescription,
        Latitude = lat,
        Longitude = longi,
        ImageUrl = testUrl
      };

      var postPoI = new PostPointOfInterest()
      {
        Name = testname,
        Description = testdescription,
        Latitude = lat,
        Longitude = longi,
        ImageUrl = testUrl
      };

      service.Setup(x => x.AddPoI(postPoI)).ReturnsAsync(returnPoI);
      var controller = new PointOfInterestController(service.Object);

      // Act
      var results = await controller.AddPOIAsync(postPoI) as ObjectResult;
      var returns = results.Value;
      var data = (JObject)JsonConvert.DeserializeObject(returns.ToString());

      string guid = data["poiId"].Value<string>();
      Guid gu = Guid.Parse(guid);
      string name = data["name"].Value<string>();
      string description = data["description"].Value<string>();
      decimal latitude = data["latitude"].Value<decimal>();
      decimal longitude = data["longitude"].Value<decimal>();
      string url = data["imageUrl"].Value<string>();

      // Assert
      Assert.Equal(gu, returnPoI.PoIID);
      Assert.Equal(name, returnPoI.Name);
      Assert.Equal(description, returnPoI.Description);
      Assert.Equal(latitude, returnPoI.Latitude);
      Assert.Equal(longitude, returnPoI.Longitude);
      Assert.Equal(url, returnPoI.ImageUrl);
    }
  }
}