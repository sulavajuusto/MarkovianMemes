using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarkovBackend.Models
{
    public class SavedMeme
    {
        public int SavedMemeId { get; set; }
        public DateTime TimeStamp { get; set; }

        public int MemeId { get; set; }
        public virtual Meme Meme { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
