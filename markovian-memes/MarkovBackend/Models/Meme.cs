using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarkovBackend.Models
{
    public class Meme
    {
        public int MemeId { get; set; }
        public string MemeText { get; set; }
        public DateTime CreatedOnDate { get; set; }
        public byte[] Data { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<SavedMeme> SavedMemes { get; set; }
        public virtual ICollection<Upvote> Upvotes { get; set; }
    }
}
