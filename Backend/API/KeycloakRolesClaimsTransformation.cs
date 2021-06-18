using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using System.Text.Json;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using API.Services;
using System.Reflection;
using System.IO;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace API
{
    /// <summary>
    /// Transforms keycloak roles in the resource_access claim to jwt role claims.
    /// </summary>
    /// <example>
    /// Example of keycloack resource_access claim
    ///   "realm_access": {
    ///     "roles": [
    ///       "user",
    ///       "default-roles-tourguide"
    ///     ]
    ///   },
    ///   "resource_access": {
    ///     "account": {
    ///       "roles": [
    ///         "manage-account",
    ///         "manage-account-links",
    ///         "view-profile"
    ///       ]
    ///     }
    ///   },
    /// </example>
    /// <seealso cref="IClaimsTransformation" />
    public class KeycloakRolesClaimsTransformation : IClaimsTransformation
    {
        private readonly string _roleClaimType;
        private readonly ILogger<Startup> _logger;

        public KeycloakRolesClaimsTransformation(string roleClaimType, IServiceProvider sp)
        {
            _roleClaimType = roleClaimType;
            _logger = sp.GetService<ILogger<Startup>>();
        }

        /// <summary>
        /// Provides a central transformation point to change the specified principal.
        /// Note: this will be run on each AuthenticateAsync call, so its safer to
        /// return a new ClaimsPrincipal if your transformation is not idempotent.
        /// </summary>
        /// <param name="principal">The <see cref="T:System.Security.Claims.ClaimsPrincipal" /> to transform.</param>
        /// <returns>
        /// The transformed principal.
        /// </returns>
        public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
        {
            var result = principal.Clone();
            if (result.Identity is not ClaimsIdentity identity)
            {
                return Task.FromResult(result);
            }

            var realmAccessValue = principal.FindFirst("realm_access")?.Value;
            if (string.IsNullOrWhiteSpace(realmAccessValue))
            {
                return Task.FromResult(result);
            }

            using var realmAccess = JsonDocument.Parse(realmAccessValue);
            var realmRoles = realmAccess
                .RootElement
                .GetProperty("roles");

            foreach (var role in realmRoles.EnumerateArray())
            {
                var value = role.GetString();
                if (!string.IsNullOrWhiteSpace(value))
                {
                    identity.AddClaim(new Claim(_roleClaimType, value));
                }
            }

            var preferred_username = principal.FindFirst("preferred_username")?.Value;
            identity.AddClaim(new Claim(ClaimTypes.GivenName, preferred_username));

            return Task.FromResult(result);
        }
    }
}
