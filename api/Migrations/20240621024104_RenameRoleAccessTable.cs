using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CyberBilbyApi.Migrations
{
    /// <inheritdoc />
    public partial class RenameRoleAccessTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RoleAccess",
                table: "RoleAccess");

            migrationBuilder.RenameTable(
                name: "RoleAccess",
                newName: "role_access");

            migrationBuilder.AddPrimaryKey(
                name: "PK_role_access",
                table: "role_access",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_role_access",
                table: "role_access");

            migrationBuilder.RenameTable(
                name: "role_access",
                newName: "RoleAccess");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoleAccess",
                table: "RoleAccess",
                column: "id");
        }
    }
}
