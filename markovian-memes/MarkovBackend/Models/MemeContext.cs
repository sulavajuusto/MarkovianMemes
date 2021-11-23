using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;


namespace MarkovBackend.Models
{
    public class MemeContext : DbContext
    {
        public MemeContext(DbContextOptions<MemeContext> options)
           : base(options)
        {
        }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Meme> Memes { get; set; }
        public DbSet<SavedMeme> SavedMemes { get; set; }
        public DbSet<Upvote> Upvotes { get; set; }
        public DbSet<User> Users { get; set; }
    }
}


