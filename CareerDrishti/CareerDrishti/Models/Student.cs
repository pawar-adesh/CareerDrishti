using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace CareerDrishti.Models
{
    public class Student
    {
        public string firstname { get; set; }
        public string middlename { get; set; }
        public string lastname { get; set; }
        [Key]
        public string email { get; set; } 
        public string mobile { get; set; }
        public string schoolname { get; set; }
        //public string? mobile;
        public string city { get; set; }
    }
}
