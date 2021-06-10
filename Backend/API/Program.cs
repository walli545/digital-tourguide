using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            CreateDbIfNotExists(host);

            host.Run(); // start handling requests
        }

        private static void CreateDbIfNotExists(IHost host)
        {
            int trys = 10;
            while(trys > 0){
                using (var scope = host.Services.CreateScope())
                {
                    var services = scope.ServiceProvider;
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    try
                    {
                        var context = services.GetRequiredService<MariaDbContext>();

                        context.Database.EnsureCreated(); // suboptimal quick and dirty, but it works for now.
                        //context.Database.Migrate();  // We should use this one, the other one can't migrate, but this doesnt seem to work.

                        logger.LogInformation("checked db befor startup");
                        trys = 0;
                    }
                    catch (Exception ex)
                    {
                        logger.LogError(ex, "An error occurred creating the DB.");
                        trys--;
                        if(trys > 0){
                            Task.Delay(5000).Wait();
                        } else {
                            Environment.Exit(-1);
                        }
                        
                    }
                }
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
