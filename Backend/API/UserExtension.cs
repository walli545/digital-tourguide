using API.Helper;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
namespace API
{
    public static class UserExtension
    {
        public static string GetName(this ClaimsPrincipal claimsPrincipal)
        {
            return claimsPrincipal.FindFirst(ClaimTypes.GivenName).Value;
        }
        public static string GetID(this ClaimsPrincipal claimsPrincipal)
        {
            return claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
        public static List<string> GetRoles(this ClaimsPrincipal claimsPrincipal)
        {
            return claimsPrincipal.FindAll(Roles.ClaimType).ToList().Select(element => element.Value).ToList();
        }
        public static Boolean HasRole(this ClaimsPrincipal claimsPrincipal, string role)
        {
            return claimsPrincipal.GetRoles().Contains(role);
        }

    }
}