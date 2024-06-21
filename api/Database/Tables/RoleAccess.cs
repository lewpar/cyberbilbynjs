using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace CyberBilbyApi.Database.Tables;

[PrimaryKey("Id")]
[Table("role_access")]
public class RoleAccess
{
    [Column("id")]
    public int Id { get; set; }

    [Column("role")]
    public UserRole UserRole { get; set; }

    [Column("route")]
    public string? Route { get; set; }
}
