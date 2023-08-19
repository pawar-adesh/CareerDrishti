import { Component, OnInit } from '@angular/core';
import arrayShuffle from 'array-shuffle';
import { elements } from 'chart.js';
import { ApiService } from '../api.service';
import { StudentTestB } from '../shared/sectionB.model';
import { CanComponentDeactivate } from '../test/test.guard';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-test-section-b',
  templateUrl: './test-section-b.component.html',
  styleUrls: ['./test-section-b.component.css'],
})
export class TestSectionBComponent implements OnInit, CanComponentDeactivate {
  questionBData!: any;
  currentUser: any;
  questionNumber: number = 0;
  isPrevDisabled: boolean = true;
  submitClicked: boolean = false;
  restrictUser: boolean = false;
  isSubmit: boolean = false;
  isNextDisabled: boolean = true;
  questionSolved=new Set();
  sectionBobj: StudentTestB = new StudentTestB();
  marksToQueType: { [key: string]: number[] } = {};
  totalMarks: { [key: string]: number } = {
    Aptitude: 0,
    Verbal: 0,
    Numerical: 0,
    Spatial: 0,
  };
  constructor(private api: ApiService, private router: Router, private spinner: NgxSpinnerService) {
    this.questionNumber = 0;
    this.marksToQueType = {
      Aptitude: [0],
      Verbal: [0],
      Numerical: [0],
      Spatial: [0],
    };
  }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('user');
    if(this.currentUser==null){
      this.router.navigate(['/register']);
      this.restrictUser= true;;
  }
    // console.log("CurrentUser: ", this.currentUser);
    this.getAllQuestions();
  }

  exitFullScreen(): void {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    // } else if (document.mozCancelFullScreen) {
    //   document.mozCancelFullScreen();
    // } else if (document.webkitExitFullscreen) {
    //   document.webkitExitFullscreen();
    // } else if (document.msExitFullscreen) {
    //   document.msExitFullscreen();
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.restrictUser==true){
      return true;
    }
    if(this.submitClicked==true){
      this.exitFullScreen();
      return true;
    }
    alert('Please complete the test before leaving.'); // Modify the alert message as desired
    return false;
  }

  getAllQuestions() {
    this.spinner.show();

    this.api.sectionBQuestions().subscribe((res) => {
      this.questionBData = arrayShuffle(res.questionDetails);
      // for(let q of res.questionDetails){
      //   console.log(q);
      // }
      // console.log(res);
      this.spinner.hide();
    });
  }

  onSelect(queType: string, selectedOption: string, queNum: number) {
    // console.log(queType);
    // console.log(selectedOption);
    // console.log("correct answer, ",this.questionBData[queNum].answer == selectedOption);
    // console.log(queNum);
    let temp = this.marksToQueType[queType];
    if (this.questionBData[queNum].answer == selectedOption) {
      temp[queNum] = 1;
    } else {
      temp[queNum] = 0;
    }
    this.marksToQueType[queType] = temp;
    this.questionSolved.add(queNum);
    if(this.questionSolved.size==2){
      this.isNextDisabled=false;
      this.questionSolved.clear();
    }
    // console.log(this.marksToQueType['Aptitude'].reduce((sum, p) => sum + p));
    // console.log(this.marksToQueType['Verbal'].reduce((sum, p) => sum + p));
    // console.log(this.marksToQueType['Spatial'].reduce((sum, p) => sum + p));
    // console.log(this.marksToQueType['Numerical'].reduce((sum, p) => sum + p));
    // console.log(temp);
    // temp[queNum] = optionMarks;
    // this.marksToQuestion[queType] = temp;
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
    if (this.questionNumber < this.questionBData.length - 2) {
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
    if (this.questionNumber == this.questionBData.length - 2) {
      // (document.getElementById('next') as HTMLInputElement).disabled = true;
      this.isSubmit = true;
      // console.log(this.marksToQuestion);
      // console.log(this.totalMarks);
      // console.log("chart",this.chart);
    }
  }

  submitTest() {
    // console.log(this.marksToQueType);
    for (const key in this.marksToQueType) {
      if (this.marksToQueType.hasOwnProperty(key)) {
        const array = this.marksToQueType[key];
        const sum = array.reduce((total, current) => total + current, 0);
        this.totalMarks[key] = sum;
      }
    }
    this.submitClicked=true;
    // console.log(this.totalMarks);
    this.addSectionBMarks();
    localStorage.clear();
  }

  addSectionBMarks() {
    this.sectionBobj.email = this.currentUser;
    this.sectionBobj.aptitude = this.totalMarks['Aptitude'];
    this.sectionBobj.verbal = this.totalMarks['Verbal'];
    this.sectionBobj.numerical = this.totalMarks['Numerical'];
    this.sectionBobj.spatial = this.totalMarks['Spatial'];
    // console.log(this.sectionBobj);
    this.api.addSectionBMarks(this.sectionBobj).subscribe((res: any) => {
      // alert('Submitted Test!');
    });
  }
}
