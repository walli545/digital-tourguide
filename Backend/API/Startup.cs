using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using API.Services;
using System.Reflection;
using System.IO;
using Swashbuckle.AspNetCore.SwaggerGen;
using Newtonsoft.Json.Converters;
using FluentValidation.AspNetCore;

namespace API
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      string mySqlConnectionStr = Configuration.GetConnectionString("MariaDbConnectionString");
      services.AddDbContextPool<MariaDbContext>(options => options.UseMySql(mySqlConnectionStr, ServerVersion.AutoDetect(mySqlConnectionStr)));

      services.AddScoped<IPointOfInterestService, PointOfInterestService>();
      services.AddScoped<IRouteService, RouteService>();
      services.AddScoped<IRoleRequestService, RoleRequestService>();

      services.AddControllers()
        .AddNewtonsoftJson(options =>
        {
          options.SerializerSettings.Converters.Add(new StringEnumConverter());
        })
        .AddFluentValidation();
      services.AddSwaggerGen(c =>
      {
        c.CustomOperationIds(apiDesc =>
        {
          return apiDesc.TryGetMethodInfo(out MethodInfo methodInfo) ? methodInfo.Name : null;
        });
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1", Description = "API Spec f�r den digitalen Reisef�hrer" });
        c.EnableAnnotations();
        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        c.IncludeXmlComments(xmlPath);
      }).AddSwaggerGenNewtonsoftSupport();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

      app.UseDeveloperExceptionPage();
      app.UseSwagger();
      app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });


    }
  }
}
