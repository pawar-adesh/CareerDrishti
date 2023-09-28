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
  questionBData: any =[];
  currentUser: any;
  questionNumber: number = 0;
  isPrevDisabled: boolean = true;
  submitClicked: boolean = false;
  restrictUser: boolean = false;
  isSubmit: boolean = false;
  isNextDisabled: boolean = true;
  // questionSolved=new Set();
  questionSolved: number[]=[];
  isSpatial: boolean = false;
  spatialIndex=0;
  spatialQuestions: any[] =[];
  sectionBobj: StudentTestB = new StudentTestB();
  marksToQueType: { [key: string]: number[] } = {};
  totalMarks: { [key: string]: number } = {
    Aptitude: 0,
    Verbal: 0,
    Numerical: 0,
    Spatial: 0,
  };
  constructor(private api: ApiService, private router: Router, private spinner: NgxSpinnerService) {
    this.questionNumber = 0; //change to 0
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
    this.getSpatialQuestion();
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
      // this.questionBData = arrayShuffle(res.questionDetails);
      const questsionDetails: any[]=[];
      for(const r in res){
        questsionDetails.push(res[r]);
      }
      // for(let q of res.questionDetails){
      //   console.log(q);
      // }
      // console.log(res);
      this.questionBData = arrayShuffle(questsionDetails);
      this.spinner.hide();
    });
  }

  getSpatialQuestion(){
    this.api.getSpatialQuestions().subscribe((res) => {
      for(const r in res){
        this.spatialQuestions.push(res[r]);
      }
      this.spatialQuestions=arrayShuffle(this.spatialQuestions);
    });
  }


  onSelect(queType: string, selectedOption: string, queNum: number) {
    if(queNum==19){
      this.isSubmit=true;
    }
   if(!this.isSpatial){
    let temp = this.marksToQueType[queType];
    if (this.questionBData[queNum].answer == selectedOption) {
      temp[queNum] = 1;
    } else {
      temp[queNum] = 0;
    }
    this.marksToQueType[queType] = temp;
    // this.questionSolved.add(queNum);
    if(!this.questionSolved.includes(queNum)){
      this.questionSolved.push(queNum);
    }
    // if(this.questionSolved.size==2){
    if(this.questionSolved.length==2){
      this.isNextDisabled=false;
      // this.questionSolved.clear();
    }
    // this.questionSolved=[];
  }
  else{
    let temp = this.marksToQueType[queType];
    if (this.spatialQuestions[queNum-16].correctAns == selectedOption) {
      temp[queNum] = 1;
    } else {
      temp[queNum] = 0;
    }
    this.marksToQueType[queType] = temp;
    console.log(this.marksToQueType);
    if(!this.questionSolved.includes(queNum)){
      this.questionSolved.push(queNum);
    }
    if(this.questionSolved.length==1){
      this.isNextDisabled=false;
    }
  }

    // console.log(this.marksToQueType['Aptitude'].reduce((sum, p) => sum + p));
    // console.log(this.marksToQueType['Verbal'].reduce((sum, p) => sum + p));
    // console.log(this.marksToQueType['Spatial'].reduce((sum, p) => sum + p));
    // console.log(this.marksToQueType['Numerical'].reduce((sum, p) => sum + p));
    // console.log(temp);
    // temp[queNum] = optionMarks;
    // this.marksToQuestion[queType] = temp;
  }

  // prevQuestion() {
  //   console.log("spatial ",this.isSpatial, this.questionNumber);
  //   if(this.questionNumber<=16){
  //     this.isSpatial=false;
  //     // console.log("spatial false: ",this.questionNumber);
  //   }
  //   if (this.questionNumber == 0) {
  //     this.isPrevDisabled = true;
  //   } else if(this.isSpatial){
  //     this.questionNumber -= 1;
  //     this.spatialIndex-=1;
  //     // (document.querySelector('input[name="option"]:checked') as HTMLInputElement).checked = true;
  //   }
  //   else{
  //     this.questionNumber -= 2;
  //   }
  //   // if(this.questionNumber < this.questionBData.length - 2){
  //   //   this.isSubmit=false;
  //   // }
  //   if(this.questionNumber<19){
  //     this.isSubmit = false;
  //   }
  // }

  changeQuestion() {
    this.questionSolved=[];
    // console.log(this.questionNumber);
    if (this.questionNumber < 19) {
    this.isSubmit = false;
    this.isNextDisabled=true;
    this.isPrevDisabled = false;
      if(this.isSpatial){
        this.questionNumber += 1;
        this.spatialIndex+=1;
        (
          document.querySelector(
            'input[name="option"]:checked'
          ) as HTMLInputElement
        ).checked = false;
      }
      else{
        this.questionNumber+=2;
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
    }
    if (this.questionNumber == this.questionBData.length) {
      this.isSpatial = true;
    }
    // if(this.questionNumber == 19){
    // this.questionNumber+=1;
    //   this.isSubmit = true;
    // }
  }

  submitTest() {
    for (const key in this.marksToQueType) {
      if (this.marksToQueType.hasOwnProperty(key)) {
        const array = this.marksToQueType[key];
        const sum = array.reduce((total, current) => total + current, 0);
        this.totalMarks[key] = sum;
      }
    }
    this.submitClicked=true;
    this.addSectionBMarks();
    localStorage.clear();
  }

  addSectionBMarks() {
    this.sectionBobj.email = this.currentUser;
    this.sectionBobj.aptitude = this.totalMarks['Aptitude'];
    this.sectionBobj.verbal = this.totalMarks['Verbal'];
    this.sectionBobj.numerical = this.totalMarks['Numerical'];
    this.sectionBobj.spatial = this.totalMarks['Spatial'];
    this.api.addSectionBMarks(this.sectionBobj).subscribe((res: any) => {
      // alert('Submitted Test!');
    });
  }
}
