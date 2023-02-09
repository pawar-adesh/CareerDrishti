using System.ComponentModel.DataAnnotations;

namespace CareerDrishti.Models
{
    public class StudentTest
    {
        [Key]
        public string email { get; set; }
        public double agriculture { get; set; }
        public double artsHumanity { get; set; }
        public double commerce { get; set; }
        public double fineart { get; set; }
        public double healthLifecycle { get; set; }
        public double technical { get; set; }
        public double uniformServ { get; set; }
    }
}
