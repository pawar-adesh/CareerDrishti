using CareerDrishti.Models;
using Microsoft.EntityFrameworkCore;

namespace CareerDrishti.Data
{

    public class CareerDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public CareerDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to mysql with connection string from app settings
            var connectionString = Configuration.GetConnectionString("WebApiDatabase");
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }

        public DbSet<Admin> Admin { get; set; }
        public DbSet<Questions> Questions { get; set; }
        public DbSet<Student> Student { get; set; }
        public DbSet<StudentTest> StudentTest { get; set; }
        public DbSet<StudentTestB> StudentTestB { get; set; }
        public DbSet<SectionB> SectionB { get; set; }
        public DbSet<School> School { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admin>().ToTable("tbl_admin");
            modelBuilder.Entity<Questions>().ToTable("tbl_questions");
            modelBuilder.Entity<Student>().ToTable("tbl_student");
            //modelBuilder.Entity<Student>().HasKey(s => s.email);
            modelBuilder.Entity<SectionB>().ToTable("tbl_sectionb");
            modelBuilder.Entity<StudentTest>().ToTable("tbl_studenttest");
            modelBuilder.Entity<StudentTestB>().ToTable("tbl_test_b");
            modelBuilder.Entity<School>().ToTable("tbl_school");
            //modelBuilder.Entity<StudentTest>().HasKey(st => st.email);
        }
    }
}
