using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarkovBackend.Models
{
    public class Image
    {
        public int ImageId { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public byte[] Data { get; set; }
    }
}
