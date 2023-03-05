import { Component, OnInit } from '@angular/core';
import arrayShuffle from 'array-shuffle';
import { elements } from 'chart.js';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-test-section-b',
  templateUrl: './test-section-b.component.html',
  styleUrls: ['./test-section-b.component.css']
})
export class TestSectionBComponent implements OnInit {
  questionBData!: any;
  currentUser: any;
  questionNumber: number = 0;
  isPrevDisabled: boolean = true;
  isSubmit:boolean=false;
  marksToQueType:{ [key: string]: number[] } = {};
  totalMarks: { [key: string]: number } = {
    'Aptitude': 0,
    'Verbal': 0,
    'Numerical': 0,
    'Spatial': 0,
  };
  constructor(private api:ApiService) {
  this.questionNumber = 0;
  this.marksToQueType = {
    'Aptitude': [0],
    'Verbal': [0],
    'Numerical': [0],
    'Spatial': [0],
  };
   }

  ngOnInit(): void {
    this.currentUser = sessionStorage.getItem('user');
    this.getAllQuestions();
  }

  getAllQuestions(){
    this.api.sectionBQuestions().subscribe(res=>{
      this.questionBData = arrayShuffle(res.questionDetails);
      // for(let q of res.questionDetails){
      //   console.log(q);
      // }
      console.log(res);
    })
  }

  onSelect(queType: string, selectedOption: string, queNum: number) {
    console.log(queType);
    console.log(selectedOption);
    console.log("correct answer, ",this.questionBData[queNum].answer == selectedOption);
    console.log(queNum);
    let temp = this.marksToQueType[queType];
    if(this.questionBData[queNum].answer == selectedOption){
      temp[queNum]=1;
    }
    else{
      temp[queNum]=0;
    }
    this.marksToQueType[queType] = temp;
    console.log(this.marksToQueType['Aptitude'].reduce((sum, p) => sum + p));
    console.log(this.marksToQueType['Verbal'].reduce((sum, p) => sum + p));
    console.log(this.marksToQueType['Spatial'].reduce((sum, p) => sum + p));
    console.log(this.marksToQueType['Numerical'].reduce((sum, p) => sum + p));
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
    if(this.questionNumber == this.questionBData.length - 2) {
      // (document.getElementById('next') as HTMLInputElement).disabled = true;
      this.isSubmit = true;
      // console.log(this.marksToQuestion);
      // console.log(this.totalMarks);
      // console.log("chart",this.chart);
    }
  }

  submitTest(){

  }

}
