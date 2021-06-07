using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
  public interface IPointOfInterestService
  {
    public Task<PointOfInterest> AddPoI(PostPointOfInterest poi);

    public Task<int> DeletePoI(Guid poi);

    public Task<PointOfInterest> GetPoI(Guid poi);

    public Task<List<PointOfInterest>> GetAllPoIs(string username);

    public Task<int> PutPoI(PutPointOfInterest poi);
  }
}