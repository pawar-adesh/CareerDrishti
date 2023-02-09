using System.ComponentModel.DataAnnotations;

namespace CareerDrishti.Models
{
    public class Questions
    {
        [Key]
        public int quetsionID { get; set; }
        public string question { get; set; }
        public string questionField { get; set; }
    }
}
