using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
  public interface IPointOfInterestService
  {
    public Task<PointOfInterest> AddPoI(PostPointOfInterest poi, bool isPromoted);

    public Task<int> DeletePoI(Guid poi);

    public Task<CenterResult> GetCenter(string username);

    public Task<PointOfInterest> GetPoI(Guid poi);

    public Task<List<PointOfInterest>> GetAllPoIs(string username);

    public Task<List<PointOfInterest>> GetAllPoIs();

    public Task<List<PointOfInterest>> GetPromotedPois();

    public Task<int> PutPoI(PutPointOfInterest poi);
  }
}