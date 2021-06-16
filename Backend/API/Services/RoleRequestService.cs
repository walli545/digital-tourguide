using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
  public class RoleRequestService : IRoleRequestService
  {
    private readonly ILogger<RoleRequestService> _logger;
    private readonly MariaDbContext _dbContext;

    /// <summary>
    /// Ctor.
    /// </summary>
    /// <param name="logger">Logger for fails.</param>
    /// <param name="dbContext">The desired db context.</param>
    public RoleRequestService(ILogger<RoleRequestService> logger, MariaDbContext dbContext)
    {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger), "logger was null!");
      _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext), "Context was null!");
    }

    public async Task<bool> AddRequest(RoleModel request)
    {
      var success = _dbContext.RoleRequests.Add(request);
      if (success.State != EntityState.Added)
      {
        _logger.LogInformation($"Failed to add request to the database! Item: {0} Given body:{1}", nameof(request), request, request);
        throw new Exception();
      }

      try
      {
        var result = await _dbContext.SaveChangesAsync();
        if (result > 0)
        {
          return true;
        }
        return false;
      }
      catch (DbUpdateException)
      {
        return false;
      }
    }

    /// <summary>
    /// Accepts the request from the given user
    /// </summary>
    /// <param name="userName">The name of the user</param>
    /// <returns>Affected rows</returns>
    public async Task<int> Accept(string userName)
    {
      var request = await _dbContext.RoleRequests.Where(request => request.CreatorName == userName).FirstOrDefaultAsync(); // as the name is the PK, there is only one entry (FirstOrDefault)
      if (request == null)
        return 0;

      var success = _dbContext.RoleRequests.Remove(request);
      if (success.State != EntityState.Deleted)
      {
        _logger.LogInformation($"Failed to delete Request from the database! Item: {0} Given poi:{1}", nameof(request), request, request);
        throw new Exception();
      }
      return await _dbContext.SaveChangesAsync();
    }

    /// <summary>
    /// Denies the request from the given user
    /// </summary>
    /// <param name="userName">The name of the user</param>
    /// <returns>Affected rows</returns>
    public async Task<int> Deny(string userName)
    {
      var request = await _dbContext.RoleRequests.Where(request => request.CreatorName == userName).FirstOrDefaultAsync(); // as the name is the PK, there is only one entry (FirstOrDefault)
      if (request == null)
        return 0;

      var success = _dbContext.RoleRequests.Remove(request);
      if (success.State != EntityState.Deleted)
      {
        _logger.LogInformation($"Failed to delete Request from the database! Item: {0} Given poi:{1}", nameof(request), request, request);
        throw new Exception();
      }
      return await _dbContext.SaveChangesAsync();
    }

    /// <summary>
    /// Fetch all open role requests.
    /// </summary>
    /// <returns>List of all open requests</returns>
    public async Task<List<RoleModel>> GetRequests()
    {
      return await _dbContext.RoleRequests.ToListAsync();
    }
  }
}
