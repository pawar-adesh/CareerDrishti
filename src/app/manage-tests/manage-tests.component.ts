import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Questions } from '../shared/manage-test.model';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-manage-tests',
  templateUrl: './manage-tests.component.html',
  styleUrls: ['./manage-tests.component.css']
})
export class ManageTestsComponent implements OnInit {
  formValue !: FormGroup;
  questionData !: any;
  isAdded! : boolean;
  isUpdated!: boolean;
  queObj : Questions = new Questions();
  constructor(private api: ApiService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      queID: [''],
      question: [''],
      questionMarathi: [''],
      questionField: ['']
    })
    this.getAllQuestions();
  }
  activateAdd(){
    this.formValue.reset();
    this.isAdded=true;
    this.isUpdated=false;
  }
  getAllQuestions(){
    this.api.showQuestions().subscribe(res=>{
      this.questionData = res.questionDetails;
      console.log(res);
    })
  }

  addQuestions(){
    this.queObj.quetsionID = this.formValue.value.queID;
    this.queObj.question = this.formValue.value.question;
    this.queObj.questionMarathi = this.formValue.value.questionMarathi;
    this.queObj.questionField = this.formValue.value.questionField;
    this.api.addQuestions(this.queObj).subscribe(res=>{
      // console.log(res);
      alert("added question");
      let closeBtn = document.getElementById('close');
      closeBtn?.click();
      this.getAllQuestions();
    });
  }

  onEdit(row : any){
    this.queObj.quetsionID = row.queID;
    this.formValue.controls['queID'].setValue(row.quetsionID);
    this.formValue.controls['question'].setValue(row.question);
    this.formValue.controls['questionField'].setValue(row.questionField);
    this.isAdded=false;
    this.isUpdated=true ;
  }

  editQuestion(){
    this.queObj.quetsionID = this.formValue.value.queID;
    this.queObj.question = this.formValue.value.question;
    this.queObj.questionField = this.formValue.value.questionField;
    this.api.updateQuestion(this.queObj)
    .subscribe(res=>{
      alert("Updated Successfully")
      let closeBtn = document.getElementById('close');
      closeBtn?.click();
      this.getAllQuestions();
   })
 }

 deleteQuestion(row : any){
  let clickedYes = confirm("Are you sure want to delete");
  if(clickedYes){
   this.api.delQue(row.quetsionID)
   .subscribe(res=>{
     alert("Deleted Successfully");
     this.getAllQuestions();
   })
  }

}
}
