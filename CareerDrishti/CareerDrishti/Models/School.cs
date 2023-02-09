using System.ComponentModel.DataAnnotations;

namespace CareerDrishti.Models
{
    public class School
    {
        [Key]
        public string name { get; set; }
        public string city { get; set; }
    }
}
