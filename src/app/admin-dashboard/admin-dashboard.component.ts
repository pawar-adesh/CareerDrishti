import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { School } from '../shared/school.model';
import { Student } from '../shared/student.model';
import { StudentTest } from '../shared/student-test.model';
// import { jsPDF } from 'jspdf';
import { Router } from '@angular/router';
import {Title}  from '@angular/platform-browser';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';

// import * as pdfMake from 'pdfmake/build/pdfmake.js';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
// import * as Chart from 'chart.js';
import Chart from 'chart.js/auto';
import * as XLSX from 'xlsx';
import * as html2canvas from 'html2canvas';
import { StudentTestB } from '../shared/sectionB.model';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})

export class AdminDashboardComponent implements OnInit {
  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef;
  hide = false;
  keepCheckDisable=0;
  keepCheckDisable1=0;
  public chart: any;
  s:any;
  enableSchools: boolean = false;
  enableStudents: boolean = false;
  enableTests: boolean = false;
  enableQuestions: boolean = false;
  schools!: FormGroup;
  formValue!: FormGroup;
  schoolData: any = [];
  schoolObj: School = new School();
  studObj: Student = new Student();
  studentData: any=[];
  studentData10: any = [];
  studentData12: any = [];
  testData: any = [];
  testData10: any;
  testData12: any;
  testBData: any = [];
  currentSchoolId = "";
  testDataObj: StudentTest = new StudentTest();
  testBDatObj: StudentTestB = new StudentTestB();
  selectedSchool:any;
  // selectedStd="both";
  selectedSchoolA="all";
  // displayedColumns: string[] = ['Student Email', 'School name', 'Agriculture', 'Arts & Humanity','Commerce','Fine Arts','Health & Life sciences','Technical', 'Uniformed Services','Aptitude', 'Verbal', 'Spatial', 'Numerical', 'Action'];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private titleService: Title) {
      this.titleService.setTitle("Admin Dashboard | Careerdrishti");
    }

  ngOnInit(): void {
    this.schools = this.fb.group({
      name: [''],
      city: [''],
    });
    this.getSchools();
    this.studentData=[];
    this.getAllStduents();
    this.getAllDetails();
    this.getTestBResults();
  }

  refreshTestResult(){
    this.getAllDetails();
    this.getTestBResults();
  }
  exportStudents10(): void {
    let element = document.getElementById('student-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, this.selectedSchoolA+'- 10th_Std.xlsx');
  }
  exportStudents12(): void {
    let element = document.getElementById('student-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, this.selectedSchoolA+'- 12th_Std.xlsx');
  }

  getSchools() {
    this.schoolData=[];
    this.spinner.show();
    this.api.getSchools().subscribe((res) => {
      for(const r in res){
        this.schoolData.push({ ...res[r], id:r});
      }
      this.spinner.hide();
      // this.schoolData = res.schoolDetails;
      // console.log(res);
    });
  }

  getAllStduents() {
    this.studentData=[];
    this.studentData10=[];
    this.studentData12=[];
    this.spinner.show();
    this.api.getStudents().subscribe((res) => {
      // this.studentData = res.studentDetails;
      for(const r in res){
        this.studentData.push({ ...res[r], id:r});
        // console.log(res[r]);
      }
      // this.studentData = res;
      // console.log(res);
      this.studentData10 = this.studentData.filter((item: { standard: any; }) => item.standard === "10th");
      this.studentData12 = this.studentData.filter((item: { standard: any; }) => item.standard === "12th");
      this.spinner.hide();
    });
    // this.api.getStudentData().subscribe(res=>{
    //   console.log("Getting response: ",res)
    // },(error)=>{
    //   console.log(error)
    // });
  }

  toggleCheckBox(st:any){
    if(st.selected){
      this.keepCheckDisable+=1;
    }
    else{
      this.keepCheckDisable-=1;
    }
    // console.log(this.keepCheckDisable);
  }

  toggleCheckBox1(st:any){
    if(st.selected){
      this.keepCheckDisable1+=1;
    }
    else{
      this.keepCheckDisable1-=1;
    }
    // console.log(this.keepCheckDisable1);
  }

  deleteStudent10() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete the selected rows?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const selectedItems = this.studentData10.filter((item:any) => item.selected);
        selectedItems.forEach((element:any) => {
          this.api.delStudent(element.id).subscribe(() => {
            // alert('Deleted Successfully');
            // this.getAllStduents();
            this.studentData10 = this.studentData10.filter((item:any) => item.id != element.id);
            // console.log(res);
          });
        });
      }
    });
  }

  deleteStudent12() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete the selected rows?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const selectedItems = this.studentData12.filter((item:any) => item.selected);
        selectedItems.forEach((element:any) => {
          // console.log(element.email, element.id);
          this.api.delStudent(element.id).subscribe(() => {
            // alert('Deleted Successfully');
            // this.getAllStduents();
            this.studentData12 = this.studentData12.filter((item:any) => item.id != element.id);
            // console.log(res);
          });
        });
      }
    });
  }

  // deleteStudent(e:String){
  // let clickedYes = confirm("Are you sure want to delete");
  //   if(clickedYes){
  //     this.api.delStudent(e).subscribe(r=>{
  //       this.getAllStduents();
  //       alert("Deleted");
  //     });
  //   }
  //   this.api.delStudent(row.email.toString())
  //  .subscribe(res=>{
  //    this.getAllStduents();
  //    alert("Deleted Successfully");
  //  })
  // }

  getAllDetails() {
    this.testData=[];
    this.spinner.show();
    this.api.getTestDetails().subscribe((res) => {
      // this.testData = r.studentTestDetails;
      for(const r in res){
        // console.log(res[r].email);
        this.s= this.studentData.find((item: {email : any}) => item.email === res[r].email);
        if(this.s!=undefined){
        this.testData.push({ ...res[r], id:r, school:this.s.schoolname});
        }
      }
      this.testData10 = this.testData.filter((item: { standard: any; }) => item.standard === "10th");
      this.testData12 = this.testData.filter((item: { standard: any; }) => item.standard === "12th");
      // console.log(this.testData10,"\n",this.testData12);
      this.spinner.hide();
    });

  }

  getTestBResults() {
    this.spinner.show();
    this.testBData=[];
    this.api.getTestBDetails().subscribe((res) => {
      for(const r in res){
        this.s= this.studentData.find((item: {email : any}) => item.email === res[r].email);
        if(this.s!=undefined){
        this.testBData.push({ ...res[r], id:r, school:this.s.schoolname});
        }
      }
      this.spinner.hide();
      console.log("testB ",this.testBData);
    });

  }

  addSchool() {
    this.schoolObj.name = this.schools.value.name;
    this.schoolObj.city = this.schools.value.city;
    // console.log(this.schoolObj);
    this.api.addSchool(this.schoolObj).subscribe((res) => {
      alert('School Added Successfully');
      this.getSchools();
    });
  }
  onEdit(row: any) {
    this.schoolObj.name = row.name;
    this.schools.controls['name'].setValue(row.name);
    this.schools.controls['city'].setValue(row.city);
    this.currentSchoolId=row.id;
  }

  editSchool() {
    this.schoolObj.name = this.schools.value.name;
    this.schoolObj.city = this.schools.value.city;
    this.api.updateSchool(this.schoolObj, this.currentSchoolId).subscribe((res) => {
      alert('Updated Successfully');
      let closeBtn = document.getElementById('close');
      closeBtn?.click();
      this.getSchools();
    });
  }

  deleteSchool(row: any) {
    let clickedYes = confirm('Are you sure want to delete');
    if (clickedYes) {
      this.api.deleteSchool(row.id).subscribe((res) => {
        this.getSchools();
        alert('Deleted Successfully');
      });
    }
  }

  manageSchools() {
    this.enableQuestions = false;
    this.enableSchools = true;
    this.enableStudents = false;
    this.enableTests = false;
  }
  manageStudents() {
    this.enableQuestions = false;
    this.enableSchools = false;
    this.enableStudents = true;
    this.enableTests = false;
  }
  manageTests() {
    this.enableQuestions = false;
    this.enableSchools = false;
    this.enableStudents = false;
    this.enableTests = true;
  }

  generateReport(test: any, testBData:any) {
    const parameters = {
      param1: test,
      param2: testBData
    };
    this.router.navigate(['/generatePDF'], { state: { data: parameters } });
    // this.createChart(test);
    // // html2canvas(this.pdfContent.nativeElement).then((canvas) => {
    // //   const imgData = canvas.toDataURL('image/png');
    // //   const pdf = new jsPDF('p', 'mm', 'a4');
    // //   pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
    // //   pdf.save('document.pdf');
    // // });
    // const doc = new jsPDF();
    // const element = document.getElementById('content') as HTMLElement;
    // const html = element.innerHTML;
    // doc.html(html);
    // const chartImage = this.chartCanvas.nativeElement.toDataURL('image/png');
    // doc.addImage(chartImage, 'PNG', 15, 15, 180, 100);
    // doc.save('document.pdf');

      // pdfMake.vfs = pdfFonts.pdfMake.vfs;

      // const docDefinition = {
      //   content: [
      //     { text: 'Student Report', style: 'header' },
      //     { text: `Name: ${test.name}` },
      //     { text: `Email: ${test.email}` },
      //     { text: 'Marks:', style: 'subheader' },
      //   ],
      //   styles: {
      //     header: { fontSize: 18, bold: true, marginBottom: 10 },
      //     subheader: { fontSize: 14, bold: true, margin: [0, 15, 0, 5] },
      //   },
      // };

      // // pdfMake.createPdf(docDefinition).download('{test.email}.pdf');
      // pdfMake.createPdf(docDefinition).download();
  }

  createChart(test: any) {
    const chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          // tension: 0.1,
        },
      ],
    };
    const chartOptions = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    const chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: chartData,
      options: {
        aspectRatio: 2.5,
      },
    });

    return chartData;
  }

  get filteredTestData10(): any[] {
    // console.log(this.testData10.filter((item: { school: any; }) => item.school === this.selectedSchool));
    if (this.selectedSchool == 'all' || !this.selectedSchool) {
      // this.testData10 = this.testData10.sort((a, b) => a["prop"] - b[prop]);
      return this.testData10;
    }
    return this.testData10.filter((item: { school: any; }) => item.school === this.selectedSchool);
  }

  get filteredTestData12(): any[] {
    // console.log(this.testData12.filter((item: { school: any; }) => item.school === this.selectedSchool));
    if (this.selectedSchool == 'all' || !this.selectedSchool) {
      // this.testData12 = this.testData12.sort((a, b) => a["prop"] - b[prop]);
      return this.testData12;
    }
    return this.testData12.filter((item: { school: any; }) => item.school === this.selectedSchool);
  }



  get filteredStudentData10(): any[] {
    if (this.selectedSchoolA == 'all' || !this.selectedSchoolA) {
      return this.studentData10;
    }
    return this.studentData10.filter((item: { schoolname: any; }) => item.schoolname === this.selectedSchoolA);
  }

  get filteredStudentData12(): any[] {
    if (this.selectedSchoolA == 'all' || !this.selectedSchoolA) {
    return this.studentData12;
  }
  return this.studentData12.filter((item: { schoolname: any; }) => item.schoolname === this.selectedSchoolA);
  }
}
