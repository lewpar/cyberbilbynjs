using Microsoft.EntityFrameworkCore;

using System.ComponentModel.DataAnnotations.Schema;

namespace CyberBilbyApi.Database.Tables
{
    [Table("Users")]
    [PrimaryKey("Id")]
    public class User
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("display_name")]
        public string? DisplayName { get; set; }

        [Column("username")]
        public string? Username { get; set; }

        [Column("password")]
        public string? Password { get; set; }

        [Column("salt")]
        public string? Salt { get; set; }
    }
}
