using System.ComponentModel.DataAnnotations;

namespace CareerDrishti.Models
{
    public class Admin
    {
        [Key]
        public string username { get; set; }
        public string password { get; set; }
    }
}
