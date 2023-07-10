using System.ComponentModel.DataAnnotations;

namespace CareerDrishti.Models
{
    public class Questions
    {
        [Key]
        public string quetsionID { get; set; }
        public string question { get; set; }
        public string questionMarathi { get; set; }
        public string questionField { get; set; }
        public string std { get; set; }
    }
}
