using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Carpool.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class EnhanceGeographicTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Localities_Districts_DistrictId",
                table: "Localities");

            migrationBuilder.DropIndex(
                name: "IX_Districts_Name",
                table: "Districts");

            migrationBuilder.AlterColumn<int>(
                name: "DistrictId",
                table: "Localities",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "AimakId",
                table: "Localities",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CountryId",
                table: "Localities",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LocalityTypeId",
                table: "Localities",
                type: "integer",
                maxLength: 50,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Population",
                table: "Localities",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RegionId",
                table: "Localities",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SearchString",
                table: "Localities",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Aimaks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    DistrictId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aimaks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Aimaks_Districts_DistrictId",
                        column: x => x.DistrictId,
                        principalTable: "Districts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LocalityTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocalityTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Localities_AimakId",
                table: "Localities",
                column: "AimakId");

            migrationBuilder.CreateIndex(
                name: "IX_Localities_CountryId",
                table: "Localities",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Localities_LocalityTypeId",
                table: "Localities",
                column: "LocalityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Localities_RegionId",
                table: "Localities",
                column: "RegionId");

            migrationBuilder.CreateIndex(
                name: "IX_Aimaks_DistrictId",
                table: "Aimaks",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_LocalityTypes_Name",
                table: "LocalityTypes",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Localities_Aimaks_AimakId",
                table: "Localities",
                column: "AimakId",
                principalTable: "Aimaks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Localities_Countries_CountryId",
                table: "Localities",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Localities_Districts_DistrictId",
                table: "Localities",
                column: "DistrictId",
                principalTable: "Districts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Localities_LocalityTypes_LocalityTypeId",
                table: "Localities",
                column: "LocalityTypeId",
                principalTable: "LocalityTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Localities_Regions_RegionId",
                table: "Localities",
                column: "RegionId",
                principalTable: "Regions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Localities_Aimaks_AimakId",
                table: "Localities");

            migrationBuilder.DropForeignKey(
                name: "FK_Localities_Countries_CountryId",
                table: "Localities");

            migrationBuilder.DropForeignKey(
                name: "FK_Localities_Districts_DistrictId",
                table: "Localities");

            migrationBuilder.DropForeignKey(
                name: "FK_Localities_LocalityTypes_LocalityTypeId",
                table: "Localities");

            migrationBuilder.DropForeignKey(
                name: "FK_Localities_Regions_RegionId",
                table: "Localities");

            migrationBuilder.DropTable(
                name: "Aimaks");

            migrationBuilder.DropTable(
                name: "LocalityTypes");

            migrationBuilder.DropIndex(
                name: "IX_Localities_AimakId",
                table: "Localities");

            migrationBuilder.DropIndex(
                name: "IX_Localities_CountryId",
                table: "Localities");

            migrationBuilder.DropIndex(
                name: "IX_Localities_LocalityTypeId",
                table: "Localities");

            migrationBuilder.DropIndex(
                name: "IX_Localities_RegionId",
                table: "Localities");

            migrationBuilder.DropColumn(
                name: "AimakId",
                table: "Localities");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Localities");

            migrationBuilder.DropColumn(
                name: "LocalityTypeId",
                table: "Localities");

            migrationBuilder.DropColumn(
                name: "Population",
                table: "Localities");

            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Localities");

            migrationBuilder.DropColumn(
                name: "SearchString",
                table: "Localities");

            migrationBuilder.AlterColumn<int>(
                name: "DistrictId",
                table: "Localities",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Districts_Name",
                table: "Districts",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Localities_Districts_DistrictId",
                table: "Localities",
                column: "DistrictId",
                principalTable: "Districts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
