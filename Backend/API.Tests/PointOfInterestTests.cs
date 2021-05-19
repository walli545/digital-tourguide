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
      pois.ForEach(x => x.Id = Guid.NewGuid());
      return pois;
    }

    /// <summary>
    /// Tests functionality when querying for POIs from a specific username.
    /// </summary>
    /// <returns></returns>
    [Fact]
    public async Task GetPoIsFromUsername()
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
  }
}
