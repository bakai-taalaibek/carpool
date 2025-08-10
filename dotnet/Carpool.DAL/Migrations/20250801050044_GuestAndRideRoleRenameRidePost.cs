using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Carpool.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class GuestAndRideRoleRenameRidePost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PostComments");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.AddColumn<Guid>(
                name: "GuestId",
                table: "Reviews",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Guests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    DateCreated = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RidePosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: true),
                    GuestId = table.Column<Guid>(type: "uuid", nullable: true),
                    RideRoleId = table.Column<int>(type: "integer", nullable: false),
                    SourceId = table.Column<int>(type: "integer", nullable: false),
                    DestinationId = table.Column<int>(type: "integer", nullable: false),
                    DepartureDateTime = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    Seats = table.Column<int>(type: "integer", nullable: false),
                    PricePerSeat = table.Column<int>(type: "integer", nullable: true),
                    PricePerCar = table.Column<int>(type: "integer", nullable: true),
                    Comment = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    DateCreated = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    DateModified = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    AnonName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    AnonPhone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    AnonCar = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RidePosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RidePosts_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RidePosts_Guests_GuestId",
                        column: x => x.GuestId,
                        principalTable: "Guests",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RidePosts_Localities_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Localities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RidePosts_Localities_SourceId",
                        column: x => x.SourceId,
                        principalTable: "Localities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RidePosts_RideRoles_RideRoleId",
                        column: x => x.RideRoleId,
                        principalTable: "RideRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RidePostComments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RidePostId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: true),
                    GuestId = table.Column<Guid>(type: "uuid", nullable: true),
                    Text = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    DateCreated = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    DateModified = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RidePostComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RidePostComments_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RidePostComments_Guests_GuestId",
                        column: x => x.GuestId,
                        principalTable: "Guests",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RidePostComments_RidePosts_RidePostId",
                        column: x => x.RidePostId,
                        principalTable: "RidePosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "RideRoles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Driver" },
                    { 2, "Passenger" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_GuestId",
                table: "Reviews",
                column: "GuestId");

            migrationBuilder.CreateIndex(
                name: "IX_RidePostComments_GuestId",
                table: "RidePostComments",
                column: "GuestId");

            migrationBuilder.CreateIndex(
                name: "IX_RidePostComments_RidePostId",
                table: "RidePostComments",
                column: "RidePostId");

            migrationBuilder.CreateIndex(
                name: "IX_RidePostComments_UserId",
                table: "RidePostComments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RidePosts_DestinationId",
                table: "RidePosts",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_RidePosts_GuestId",
                table: "RidePosts",
                column: "GuestId");

            migrationBuilder.CreateIndex(
                name: "IX_RidePosts_RideRoleId",
                table: "RidePosts",
                column: "RideRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_RidePosts_SourceId",
                table: "RidePosts",
                column: "SourceId");

            migrationBuilder.CreateIndex(
                name: "IX_RidePosts_UserId",
                table: "RidePosts",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Guests_GuestId",
                table: "Reviews",
                column: "GuestId",
                principalTable: "Guests",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Guests_GuestId",
                table: "Reviews");

            migrationBuilder.DropTable(
                name: "RidePostComments");

            migrationBuilder.DropTable(
                name: "RidePosts");

            migrationBuilder.DropTable(
                name: "Guests");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_GuestId",
                table: "Reviews");

            migrationBuilder.DeleteData(
                table: "RideRoles",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "RideRoles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DropColumn(
                name: "GuestId",
                table: "Reviews");

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DestinationId = table.Column<int>(type: "integer", nullable: false),
                    RideRoleId = table.Column<int>(type: "integer", nullable: false),
                    SourceId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: true),
                    AnonCar = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    AnonName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    AnonPhone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Comment = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    DateCreated = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    DateModified = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    DepartureDateTime = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    PricePerCar = table.Column<int>(type: "integer", nullable: true),
                    PricePerSeat = table.Column<int>(type: "integer", nullable: true),
                    Seats = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Posts_Localities_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Localities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Posts_Localities_SourceId",
                        column: x => x.SourceId,
                        principalTable: "Localities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Posts_RideRoles_RideRoleId",
                        column: x => x.RideRoleId,
                        principalTable: "RideRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PostComments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PostId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: true),
                    DateCreated = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    DateModified = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    Text = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PostComments_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PostComments_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PostComments_PostId",
                table: "PostComments",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_PostComments_UserId",
                table: "PostComments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_DestinationId",
                table: "Posts",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_RideRoleId",
                table: "Posts",
                column: "RideRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_SourceId",
                table: "Posts",
                column: "SourceId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_UserId",
                table: "Posts",
                column: "UserId");
        }
    }
}
