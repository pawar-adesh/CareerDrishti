import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from './shared/student.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // public AdminApiUrl = 'http://careerdrishti-dev.us-east-1.elasticbeanstalk.com//api/Admin';
  public AdminApiUrl = 'https://careerdrishti-api-default-rtdb.firebaseio.com/admin/';
  public QuestionUrl = 'http://careerdrishti-dev.us-east-1.elasticbeanstalk.com//api/Questions';
  public Question10Url = 'https://careerdrishti-api-default-rtdb.firebaseio.com/Questions10/';
  public Question12Url = 'https://careerdrishti-api-default-rtdb.firebaseio.com/Questions12/';
  public spHandlerUrl = 'http://careerdrishti-dev.us-east-1.elasticbeanstalk.com//api/spHandling';
  // public StudentUrl = 'http://careerdrishti-dev.us-east-1.elasticbeanstalk.com//api/Student';
  public StudentUrl = 'https://careerdrishti-api-default-rtdb.firebaseio.com/Student/';
  // public StudentTestUrl = 'http://careerdrishti-dev.us-east-1.elasticbeanstalk.com//api/StudentTest';
  public StudentTestUrl = 'https://careerdrishti-api-default-rtdb.firebaseio.com/StudentTest/';
  // public StudentTestBUrl = 'http://careerdrishti-dev.us-east-1.elasticbeanstalk.com//api/StudentTestB';
  public StudentTestBUrl = 'https://careerdrishti-api-default-rtdb.firebaseio.com/StudentTestB/';
  // public SchoolUrl = 'http://careerdrishti-dev.us-east-1.elasticbeanstalk.com//api/School';
  public SchoolUrl = 'https://careerdrishti-api-default-rtdb.firebaseio.com/School/';
  // public SectionBUrl = 'http://careerdrishti-dev.us-east-1.elasticbeanstalk.com//api/SectionB';
  public SectionBUrl = 'https://careerdrishti-api-default-rtdb.firebaseio.com/SectionB/';
  constructor(private _http: HttpClient) {}

  // getStudentData(){
  //   return this._http.get("/").pipe(map((res:any)=>{
  //     return res;
  //   }));
  // }
  GetAdminCreds() {
    return this._http.get<any>(this.AdminApiUrl + '.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  showQuestions10() {
    return this._http.get<any>(this.Question10Url + '.json').pipe(
      map((res: any) => {
        // return res.questionDetails.filter((item: any) => item.std == '10');
        return res;
      })
    );
  }

  showQuestions12() {
    return this._http.get<any>(this.Question12Url + '.json').pipe(
      map((res: any) => {
        // return res.questionDetails.filter((item: any) => item.std == '12');
        return res;
      })
    );
  }

  sectionBQuestions() {
    return this._http.get<any>(this.SectionBUrl + '.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addQuestions10(data: any) {
    return this._http.post<any>(this.Question10Url + '.json', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addQuestions12(data: any) {
    return this._http.post<any>(this.Question12Url + '.json', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addQuestionsB(data: any) {
    return this._http.post<any>(this.SectionBUrl + '.json', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateQuestion10(data: any, id:any) {
    return this._http.put<any>(this.Question10Url+ id + '/.json', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateQuestion12(data: any, id:any) {
    return this._http.put<any>(this.Question12Url+ id + '.json', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateQuestionB(data: any, id:any) {
    return this._http.put<any>(this.SectionBUrl+ id + '.json', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // delQue(id: number) {
  //   return this._http.delete<any>(this.QuestionUrl + '/delQue/' + id).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  delQue10(id: number) {
    return this._http.delete<any>(this.Question10Url + id + '/.json' ).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  delQue12(id: number) {
    return this._http.delete<any>(this.Question12Url + id + '/.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  delQueB(id: number) {
    return this._http.delete<any>(this.SectionBUrl + id + '/.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getAllFields() {
    return this._http.get<any>(this.spHandlerUrl + '/getFields').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getStudents() {
    return this._http.get<any>(this.StudentUrl+'.json').pipe(
      map((res: any) => {
        // console.log(res);
        return res;
      })
    );
  }

  addStudent(data: Student) {
    return this._http.post<Student>(this.StudentUrl + '.json', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  delStudent(data: String) {
    return this._http.delete<any>(this.StudentUrl + '/delStudent/' + data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getStandard(email: String) {
    return this._http.get<any>(this.StudentUrl+'.json').pipe(
      map((res: any) => {
        // return res.studentDetails.find((item: any) => item.email == email);
        const studentDetails=[];
        for(const r in res){
          studentDetails.push(res[r]);
        }
        return studentDetails.find((item: any) => item.email == email);
      })
    );
  }

  getTestDetails() {
    return this._http.get<any>(this.StudentTestUrl + '.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  checkStudentMarksExist(email: String) {
    return this._http.get<any>(this.StudentTestUrl + '.json').pipe(
      map((res: any) => {
        const tempTestDetails = [];
        for(const r in res){
          tempTestDetails.push(res[r]);
        }
        // const user = res.studentTestDetails.find(
        //   (item: any) => item.email === email
        // );
        const user = tempTestDetails.find(
          (item: any) => item.email === email
        );
        if (user) {
          return true;
        }
        return false;
      })
    );
  }

  addSectionBMarks(data: any) {
    return this._http
      .post<any>(this.StudentTestBUrl + '.json', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getTestBDetails() {
    return this._http.get<any>(this.StudentTestBUrl + '.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addMarks(data: any) {
    return this._http
      .post<any>(this.StudentTestUrl + '.json', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  addSchool(data: any) {
    return this._http.post<any>(this.SchoolUrl + '.json', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteSchool(id: any) {
    return this._http.delete(this.SchoolUrl + id + '.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateSchool(data: any, id:any) {
    return this._http.put<any>(this.SchoolUrl + id + '.json', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getSchools() {
    return this._http.get(this.SchoolUrl+'.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
