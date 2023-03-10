import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Student } from './student.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as AOS from 'aos';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  formValue!: FormGroup;
  show1:boolean=false;
  show2:boolean=false;
  show3:boolean=false;
  show4:boolean=false;
  show5:boolean=false;
  show6:boolean=false;
  show7:boolean=false;
  isRegistered: boolean = false;
  public studentObj = new Student();
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      schoolname: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
    });
    AOS.init();
  }

  closeBtn1(){
    this.show1=false;
    this.show2=false;
    this.show3=false;
  }
  closeBtn2(){
    this.show4=false;
    this.show5=false;
    this.show6=false;
    this.show7=false;
  }
  showf1(){
    this.show1=true;
    this.show2=false;
    this.show3=false;
  }
  showf2(){
    this.show2=true;
    this.show1=false;
    this.show3=false;
  }
  showf3(){
    this.show3=true;
    this.show2=false;
    this.show1=false;
  }
  showf4(){
    this.show4=true;
    this.show5=false;
    this.show6=false;
    this.show7=false;
  }
  showf5(){
    this.show5=true;
    this.show4=false;
    this.show6=false;
    this.show7=false;
  }
  showf6(){
    this.show6=true;
    this.show4=false;
    this.show5=false;
    this.show7=false;
  }
  showf7(){
    this.show7=true;
    this.show4=false;
    this.show6=false;
    this.show5=false;
  }
  registerStudent() {
    this.addStudent();
    this.isRegistered = true;
    localStorage.setItem('user', this.formValue.value.email);
    // console.log(this.studentObj);
  }

  addStudent() {
    this.studentObj.firstname = this.formValue.value.firstName.charAt(0).toUpperCase() + this.formValue.value.firstName.slice(1);
    this.studentObj.middlename = this.formValue.value.middleName.charAt(0).toUpperCase() + this.formValue.value.middleName.slice(1);
    this.studentObj.lastname = this.formValue.value.lastName.charAt(0).toUpperCase() + this.formValue.value.lastName.slice(1);
    this.studentObj.email = this.formValue.value.email.toLowerCase();
    this.studentObj.schoolname = this.formValue.value.schoolname;
    this.studentObj.mobile = this.formValue.value.mobile;
    this.studentObj.city = this.formValue.value.city;
    this.api.addStudent(this.studentObj).subscribe(res => {
      alert('starting test');
      console.log(res);
      this.router.navigate(['test']);
    });
  }
}
