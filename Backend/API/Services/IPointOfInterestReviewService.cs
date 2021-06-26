using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
  public interface IPointOfInterestReviewService
  {
    public Task<int> AddPoIReview(PostPoIReview body);

    public bool DeletePoIReviews(Guid poiId);

    public Task<List<PoIReview>> GetPoIReviews(Guid poiId);

    public Task<int> DeleteReview(Guid reviewId);
  }
}
