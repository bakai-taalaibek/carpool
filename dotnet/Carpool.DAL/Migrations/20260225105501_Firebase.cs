using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Carpool.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class Firebase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FirebaseUid",
                table: "AspNetUsers",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirebaseUid",
                table: "AspNetUsers");
        }
    }
}
