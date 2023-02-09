import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { School } from '../shared/school.model';
import { Student } from '../student/student.model';
import { StudentTest } from '../test/student-test.model';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  enableSchools:boolean = false;
  enableStudents:boolean = false;
  enableTests:boolean = false;
  enableQuestions:boolean = false;
  schools !: FormGroup;
  formValue !: FormGroup;
  schoolData:any;
  schoolObj:School=new School();
  studObj: Student = new Student();
  studentData:any;
  testData: any;
  testDataObj: StudentTest = new StudentTest();
  constructor(private fb: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.schools = this.fb.group({
      name: [''],
      city: ['']
    });
    this.getSchools();
    this.getAllStduents();
    this.getAllDetails();
  }

  getSchools(){
    this.api.getSchools().subscribe(res=>{
      this.schoolData = res.schoolDetails;
      console.log(res);
    })
  }

  getAllStduents(){
    this.api.getStudents().subscribe(res=>{
      this.studentData = res.studentDetails;
      console.log(res);
    })
  }

  getAllDetails(){
    this.api.getTestDetails().subscribe(r=>{
      this.testData = r.studentTestDetails;
      console.log(r);
    });
  }

  addSchool(){
    this.schoolObj.name = this.schools.value.name;
    this.schoolObj.city = this.schools.value.city;
    console.log(this.schoolObj);
    this.api.addSchool(this.schoolObj).subscribe(res=>{
      alert('School Added Successfully');
      this.getSchools();
    })
  }
  onEdit(row : any){
    this.schoolObj.name = row.name;
    this.schools.controls['name'].setValue(row.name);
    this.schools.controls['city'].setValue(row.city);
  }

  editSchool(){
    this.schoolObj.name = this.schools.value.name;
    this.schoolObj.city = this.schools.value.city;
    this.api.updateSchool(this.schoolObj)
    .subscribe(res=>{
      alert("Updated Successfully")
      let closeBtn = document.getElementById('close');
      closeBtn?.click();
      this.getSchools();
   })
 }

 deleteSchool(row : any){
  let clickedYes = confirm("Are you sure want to delete");
  if(clickedYes){
   this.api.deleteSchool(row.name)
   .subscribe(res=>{
     this.getSchools();
     alert("Deleted Successfully");
   })
  }
 }

  manageSchools(){
    this.enableQuestions=false;
    this.enableSchools=true;
    this.enableStudents=false;
    this.enableTests=false;
  }
  manageStudents(){
    this.enableQuestions=false;
    this.enableSchools=false;
    this.enableStudents=true;
    this.enableTests=false;
  }
  manageTests(){
    this.enableQuestions=false;
    this.enableSchools=false;
    this.enableStudents=false;
    this.enableTests=true;
  }
}
