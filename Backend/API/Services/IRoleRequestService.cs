using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
  public interface IRoleRequestService
  {
    public Task<bool> AddRequest(RoleModel request);

    public Task<List<RoleModel>> GetRequests();

    public Task<int> Accept(string userName);

    public Task<int> Deny(string userName);
  }
}
