import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { pipe } from 'rxjs';
import {map} from 'rxjs/operators'
import { Student } from './shared/student.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public AdminApiUrl = "https://localhost:7011/api/Admin";
  public QuestionUrl = "https://localhost:7011/api/Questions";
  public spHandlerUrl= "https://localhost:7011/api/spHandling";
  public StudentUrl = "https://localhost:7011/api/Student";
  public StudentTestUrl = "https://localhost:7011/api/StudentTest";
  public StudentTestBUrl = "https://localhost:7011/api/StudentTestB";
  public SchoolUrl = "https://localhost:7011/api/School";
  public SectionBUrl = "https://localhost:7011/api/SectionB";
  constructor(private _http: HttpClient) {}

  // getStudentData(){
  //   return this._http.get("/").pipe(map((res:any)=>{
  //     return res;
  //   }));
  // }
  GetAdminCreds(){
    return this._http.get<any>(this.AdminApiUrl+"/admin").pipe(map((res:any)=>{
      return res;
    }));
  }

  showQuestions(){
    return this._http.get<any>(this.QuestionUrl+"/getAllQues").pipe(map((res:any)=>{
      return res;
    }));
  }

  sectionBQuestions(){
    return this._http.get<any>(this.SectionBUrl+"/getAllQues").pipe(map((res:any)=>{
      return res;
    }));
  }

  addQuestions(data:any){
    return this._http.post<any>(this.QuestionUrl+"/addQue",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  addQuestionsB(data:any){
    return this._http.post<any>(this.SectionBUrl+"/addQue",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  updateQuestion(data:any){
    return this._http.put<any>(this.QuestionUrl+"/updateQue",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  updateQuestionB(data:any){
    return this._http.put<any>(this.SectionBUrl+"/updateQue",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  delQue(id: number){
    return this._http.delete<any>(this.QuestionUrl+"/delQue/"+id).pipe(map((res:any)=>{
      return res;
    }));
  }

  delQueB(id: number){
    return this._http.delete<any>(this.SectionBUrl+"/delQue/"+id).pipe(map((res:any)=>{
      return res;
    }));
  }

  getAllFields(){
    return this._http.get<any>(this.spHandlerUrl+"/getFields").pipe(map((res:any)=>{
      return res;
    }))
  }

  getStudents(){
    return this._http.get<any>(this.StudentUrl).pipe(map((res:any)=>{
      return res;
    }));
  }

  addStudent(data:Student){
    return this._http.post<Student>(this.StudentUrl+"/addStudent", data).pipe(map((res:any)=>{
      return res;
  }));
  }

  delStudent(data : String){
    return this._http.delete<any>(this.StudentUrl+"/delStudent/"+data).pipe(map((res:any)=>{
      return res;
    }));
  }

  getTestDetails(){
    return this._http.get<any>(this.StudentTestUrl+"/testDetails").pipe(map((res:any)=>{
      return res;
    }))
  }

  addSectionBMarks(data:any){
    return this._http.post<any>(this.StudentTestBUrl+"/addTestMarks", data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getTestBDetails(){
    return this._http.get<any>(this.StudentTestBUrl+"/testDetails").pipe(map((res:any)=>{
      return res;
    }))
  }

  addMarks(data:any){
    return this._http.post<any>(this.StudentTestUrl+"/addTestMarks", data).pipe(map((res:any)=>{
      return res;
    }))
  }

  addSchool(data:any){
    return this._http.post<any>(this.SchoolUrl+"/addSchool", data).pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteSchool(name:string){
    return this._http.delete(this.SchoolUrl+"/delSchool/"+name).pipe(map((res:any)=>{
      return res;
    }))
  }

  updateSchool(data:any){
    return this._http.put<any>(this.SchoolUrl+"/updateSchool",data).pipe(map((res:any)=>{
      return res;
    }));
  }
  getSchools(){
    return this._http.get(this.SchoolUrl).pipe(map((res:any)=>{
      return res;
    }))
  }
}
