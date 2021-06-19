using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ConnectionsRoutePoI",
                columns: table => new
                {
                    PoIID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    RouteID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Order = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConnectionsRoutePoI", x => new { x.PoIID, x.RouteID, x.Order });
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PointOfInterest",
                columns: table => new
                {
                    PoIID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Latitude = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Longitude = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    AverageRating = table.Column<double>(type: "double", nullable: false),
                    NumberOfRatings = table.Column<int>(type: "int", nullable: false),
                    ImageUrl = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PointOfInterest", x => x.PoIID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "RoleRequests",
                columns: table => new
                {
                    CreatorName = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RequestedRole = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleRequests", x => x.CreatorName);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Route",
                columns: table => new
                {
                    RouteID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatorName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Duration = table.Column<float>(type: "float", nullable: false),
                    Polyline = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AverageRating = table.Column<double>(type: "double", nullable: false),
                    NumberOfRatings = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Route", x => x.RouteID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PoIReview",
                columns: table => new
                {
                    PoIReviewId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    PointOfInterestPoIID = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    UserName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PoIReview", x => x.PoIReviewId);
                    table.ForeignKey(
                        name: "FK_PoIReview_PointOfInterest_PointOfInterestPoIID",
                        column: x => x.PointOfInterestPoIID,
                        principalTable: "PointOfInterest",
                        principalColumn: "PoIID",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "RouteReview",
                columns: table => new
                {
                    RouteReviewId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    RouteID = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    UserName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RouteReview", x => x.RouteReviewId);
                    table.ForeignKey(
                        name: "FK_RouteReview_Route_RouteID",
                        column: x => x.RouteID,
                        principalTable: "Route",
                        principalColumn: "RouteID",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PoIReview_PointOfInterestPoIID",
                table: "PoIReview",
                column: "PointOfInterestPoIID");

            migrationBuilder.CreateIndex(
                name: "IX_RouteReview_RouteID",
                table: "RouteReview",
                column: "RouteID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConnectionsRoutePoI");

            migrationBuilder.DropTable(
                name: "PoIReview");

            migrationBuilder.DropTable(
                name: "RoleRequests");

            migrationBuilder.DropTable(
                name: "RouteReview");

            migrationBuilder.DropTable(
                name: "PointOfInterest");

            migrationBuilder.DropTable(
                name: "Route");
        }
    }
}
