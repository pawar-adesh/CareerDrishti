import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Questions } from '../shared/manage-test.model';
import arrayShuffle from 'array-shuffle';
import { StudentTest } from '../shared/student-test.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  currentUser: any;
  // langContainer: String = '';
  preferedLang: any;
  questionData!: any;
  questionFieldData: string[] = [
    'Agriculture',
    'Arts & Humanity',
    'Commerce',
    'Fine Arts',
    'Health & Lifecycle',
    'Technical',
    'Uniform Service',
  ];
  questionNumber: number = 0;
  options!: any[];
  marksToQuestion: { [key: string]: number[] } = {};
  isSubmit: boolean = false;
  isPrevDisabled: boolean = true;
  totalMarks: { [key: string]: number } = {
    'Agriculture': 0,
    'Arts & Humanity': 0,
    'Commerce': 0,
    'Fine Arts': 0,
    'Health & Lifecycle': 0,
    'Technical': 0,
    'Uniform Service': 0,
  };
  isTermsAccepted!: boolean;
  public showForm!: boolean;
  testLang: any;
  queObj: Questions = new Questions();
  studentTestObj: StudentTest = new StudentTest();



  constructor(private api: ApiService) {
    this.questionNumber = 0;
    this.marksToQuestion = {
      'Agriculture': [],
      'Arts & Humanity': [],
      'Commerce': [],
      'Fine Arts': [],
      'Health & Lifecycle': [],
      'Technical': [],
      'Uniform Service': [],
    };
    this.options = [
      {
        label: 'Strongly Agree',
        marks: 4,
      },
      {
        label: 'Agree',
        marks: 3,
      },
      {
        label: 'Disagree',
        marks: 2,
      },
      {
        label: 'Strongly Disagree',
        marks: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.testLang = sessionStorage.getItem('language');
    console.log("Language of test ",this.testLang)
    // this.isTermsAccepted = true;
    this.isTermsAccepted = false;
    this.showForm = false;
    this.getAllQuestions();
    // this.getAllFields();
    this.currentUser = sessionStorage.getItem('user');
    console.log(this.currentUser);
    console.log(this.options);
  }
  form = new FormGroup({
    language: new FormControl('', Validators.required)
  });

  get f(){
    return this.form.controls;
  }

  submit(){
    this.preferedLang = this.form.value.language;
    console.log("preferedLang: ",this.preferedLang);
    sessionStorage.setItem('language',this.preferedLang);
    console.log(sessionStorage);
    // this.langContainer='hide';
  }
  getAllQuestions() {
    this.api.showQuestions().subscribe((res) => {
      this.questionData = arrayShuffle(res.questionDetails);
      console.log(res);
    });
  }

  // getAllFields(){
  //   this.api.getAllFields().subscribe((res)=>{
  //     res.forEach((q: { questionField: string; }) => {
  //       this.questionFieldData.push(q.questionField);
  //     });
  //   });
  //   console.log(this.questionFieldData)

  //   console.log(this.totalMarks);
  // }

  getPasskey(event: any) {
    if (event.target.checked == true) {
      this.showForm = true;
    } else {
      this.showForm = false;
    }
  }

  displayQuestions(event: any) {
    if (
      (<HTMLInputElement>document.getElementById('passkey'))!.value == 'test1'
    ) {
      // this.router.navigate('')
      this.isTermsAccepted = true;
    }
  }

  onSelect(queType: string, optionMarks: number, queNum: number) {
    // console.log(queType);
    // console.log(optionMarks);
    let temp = this.marksToQuestion[queType];
    // console.log(temp);
    temp[queNum] = optionMarks;
    this.marksToQuestion[queType] = temp;
  }

  prevQuestion() {
    if (this.questionNumber == 0) {
      this.isPrevDisabled = true;
    } else {
      this.questionNumber -= 2;
      // (document.querySelector('input[name="option"]:checked') as HTMLInputElement).checked = true;
    }
  }
  changeQuestion() {
    if (this.questionNumber < this.questionData.length - 2) {
      this.isPrevDisabled = false;
      this.questionNumber += 2;
      (
        document.querySelector(
          'input[name="option"]:checked'
        ) as HTMLInputElement
      ).checked = false;
      (
        document.querySelector(
          'input[name="option2"]:checked'
        ) as HTMLInputElement
      ).checked = false;
    }
    if(this.questionNumber == this.questionData.length - 2) {
      // (document.getElementById('next') as HTMLInputElement).disabled = true;
      this.isSubmit = true;
      // console.log(this.marksToQuestion);
      // console.log(this.totalMarks);
      // console.log("chart",this.chart);
    }
  }

  submitTest() {
    for (let i = 0; i < this.questionFieldData.length; i++) {
      let tempsum = 0;
      this.marksToQuestion[this.questionFieldData[i]].forEach((item) => {
        tempsum += item;
      });
      // console.log(this.questionFieldData[i],tempsum);
      // console.log(this.questionNumber);
      this.totalMarks[this.questionFieldData[i]] = (tempsum / (10 * 4)) * 100; //here 10 is n where n is no of questions per field
    }
    this.addTestDetails();
    // this.langContainer = 'display';
    alert('submitted successfully');
    console.log(this.studentTestObj);
    sessionStorage.clear();
  }

  addTestDetails() {
    this.studentTestObj.email = this.currentUser;
    this.studentTestObj.agriculture = this.totalMarks['Agriculture'];
    this.studentTestObj.artsHumanity = this.totalMarks['Arts & Humanity'];
    this.studentTestObj.commerce = this.totalMarks['Commerce'];
    this.studentTestObj.fineart = this.totalMarks['Fine Arts'];
    this.studentTestObj.healthLifecycle = this.totalMarks['Health & Lifecycle'];
    this.studentTestObj.technical = this.totalMarks['Technical'];
    this.studentTestObj.uniformServ = this.totalMarks['Uniform Service'];
    this.api.addMarks(this.studentTestObj).subscribe(res=> {
      console.log(res);
      alert('submitted');
    });
  }

  forManualChart() {
    let d = [40, 7, 7, 7, 7, 7, 7];
    for (let i = 0; i < 7; i++) {
      this.totalMarks[this.questionFieldData[i]] = (d[i] / (10 * 4)) * 100;
    }
  }
}
