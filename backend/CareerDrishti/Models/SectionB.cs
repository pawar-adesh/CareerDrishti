using System.ComponentModel.DataAnnotations;

namespace CareerDrishti.Models
{
    public class SectionB
    {
        [Key]
        public string qID { get; set; }
        public string que { get; set; }
        public string option1 { get; set; }
        public string option2 { get; set; }
        public string option3 { get; set; }
        public string option4 { get; set; }
        public string answer { get; set; }
        public string queType { get; set; }
    }
}
