using System.ComponentModel.DataAnnotations;

namespace CareerDrishti.Models
{
    public class StudentTestB
    {
        [Key]
        public string email { get; set; }
        public int aptitude { get; set; }
        public int verbal { get; set; }
        public int numerical { get; set; }
        public int spatial { get; set; }


    }

}
