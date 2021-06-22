using Microsoft.AspNetCore.Authorization;
using System;

namespace API
{
    public class AuthorizedRolesAttribute : AuthorizeAttribute
{
    public AuthorizedRolesAttribute(params string[] roles)
    {
        Roles = String.Join(",", roles);
    }
}
}