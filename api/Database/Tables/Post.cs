using Microsoft.EntityFrameworkCore;

using System.ComponentModel.DataAnnotations.Schema;

namespace CyberBilbyApi.Database.Tables
{
    [Table("Posts")]
    [PrimaryKey("Id")]
    public class Post
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("title")]
        public string? Title { get; set; }

        [Column("short_content")]
        public string? ShortContent { get; set; }

        [Column("content")]
        public string? Content { get; set; }
    }
}
