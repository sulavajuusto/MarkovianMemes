using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarkovBackend.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public DateTime LastLogin { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<SavedMeme> SavedMemes { get; set; }
        public virtual ICollection<Upvote> Upvotes { get; set; }
    }
}
