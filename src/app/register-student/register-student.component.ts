import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Student } from '../shared/student.model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css'],
})
export class RegisterStudentComponent implements OnInit {
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  SecondTestAttempt = '';
  day = this.now.getDay();
  minDate = moment({
    year: this.year - 100,
    month: this.month,
    day: this.day,
  }).format('YYYY-MM-DD');
  maxDate = moment({
    year: this.year,
    month: this.month,
    day: this.day - 2,
  }).format('YYYY-MM-DD');
  formValue!: FormGroup;
  emailForm!: FormGroup;
  public studentObj = new Student();
  allSchools: any;
  showForm: String = '';
  langContainer: String = '';
  hideNext: String = '';
  display = '';
  preferedLang: any;
  registerUser: string = '';
  isTermsAccepted!: boolean;
  emailVal:String="";

  emailData: any = [];
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    localStorage.clear();
    this.formValue = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      schoolname: ['', Validators.required],
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      city: ['', Validators.required],
      standard: ['', Validators.required],
    });
    this.emailForm = this.fb.group({
      email: ['', Validators.required],
    });
    this.getSchools();
    //enable test instructions
    // this.registerUser = 'yes';
    //     this.showForm = 'no';
    this.getStudentsData();
  }
  form = new FormGroup({
    language: new FormControl('', Validators.required),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    this.preferedLang = this.form.value.language;
    // console.log("preferedLang: ",this.preferedLang);
    sessionStorage.setItem('language', this.preferedLang);
    // console.log(sessionStorage);
    this.showForm = 'no';
    this.registerUser = 'yes';
    this.langContainer = 'hide';
  }
  getStudentsData() {
    this.api.getStudents().subscribe((res) => {
      this.emailData = res.studentDetails;
      // console.log('result: ', res);
      res.studentDetails.forEach((element: any) => {
        this.emailData.push(element.email);
      });
      // console.log("Emails",this.studentData);
    });
  }
  checkEmail() {
    // if (this.emailData.includes(this.emailForm.value.email)) {
    // console.log(this.emailData);
    this.spinner.show();
    this.emailForm.disable();
    localStorage.setItem('user', this.emailForm.value.email);
    // console.log(localStorage);
    // console.log(this.emailData.includes('adesh'));
    if (this.emailData.indexOf(this.emailForm.value.email) !== -1) {
      // console.log('yes contains');
      this.registerUser = 'yes';
      this.showForm = 'no';
      this.langContainer = 'display';
      this.api
        .checkStudentMarksExist(this.emailForm.value.email)
        .subscribe((res) => {
          if (res) {
            this.SecondTestAttempt = 'yes';
            this.showForm = '';
            this.registerUser = '';
          }
          this.spinner.hide();
        });
      } else {
        this.registerUser = 'no';
        this.showForm = 'yes';
        this.spinner.hide();
    }
    
    this.hideNext = 'yes';
  }

  addStudent() {
    this.spinner.show();
    if (this.emailData.indexOf(this.emailForm.value.email) !== -1) {
      // alert('Check Email ID. It is already registered!');
    } else {
      this.studentObj.firstname =
        this.formValue.value.firstName.charAt(0).toUpperCase() +
        this.formValue.value.firstName.slice(1);
      this.studentObj.middlename =
        this.formValue.value.middleName.charAt(0).toUpperCase() +
        this.formValue.value.middleName.slice(1);
      this.studentObj.lastname =
        this.formValue.value.lastName.charAt(0).toUpperCase() +
        this.formValue.value.lastName.slice(1);
      this.studentObj.email = this.emailForm.value.email;
      this.studentObj.gender = this.formValue.value.gender;
      this.studentObj.dob = this.formValue.value.dob;
      // console.log('school name:', this.formValue.value.schoolname);
      this.studentObj.schoolname = this.formValue.value.schoolname;
      this.studentObj.standard = this.formValue.value.standard;
      this.studentObj.mobile = this.formValue.value.mobile;
      this.studentObj.city = this.formValue.value.city;
      // console.log("StudentObj, ",this.studentObj);

      this.api.addStudent(this.studentObj).subscribe((res) => {
        // alert('starting test');
        setTimeout(() => {
          // console.log(res);
          this.registerUser = 'yes';
          sessionStorage.setItem('standard', this.formValue.value.standard);
          this.showForm = 'no';
          this.hideNext = 'yes';
          this.formValue.reset();
          this.emailForm.disable();
          this.spinner.hide();
        }, 2000);
      });
    }
  }
  selected = '----';
  update(e: any) {
    this.selected = e.target.value;
  }
  getSchools() {
    this.spinner.show();
    this.api.getSchools().subscribe((r) => {
      this.allSchools = r.schoolDetails;
      // console.log(this.allSchools);
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    });
  }

  displayQuestions(event: any) {
    // this.router.navigate('')
    var e = <HTMLInputElement>document.getElementById('checkInstruct');
    if (e.checked) {
      this.isTermsAccepted = true;
    } else {
      this.isTermsAccepted = false;
    }
  }

  clearText(){
    this.emailVal="";
    this.emailForm.enable();
    this.SecondTestAttempt="";
    this.hideNext="";
  }
}
