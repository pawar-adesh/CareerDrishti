import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { School } from '../shared/school.model';
import { Student } from '../shared/student.model';
import { StudentTest } from '../shared/student-test.model';
// import { jsPDF } from 'jspdf';
import { Router } from '@angular/router';

// import * as pdfMake from 'pdfmake/build/pdfmake.js';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
// import * as Chart from 'chart.js';
import Chart from 'chart.js/auto';
import * as XLSX from 'xlsx';
import * as html2canvas from 'html2canvas';
import { StudentTestB } from '../shared/sectionB.model';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})

export class AdminDashboardComponent implements OnInit {
  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef;
  hide = false;
  public chart: any;
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
  testData: any = [];
  testBData: any = [];
  currentSchoolId = "";
  testDataObj: StudentTest = new StudentTest();
  testBDatObj: StudentTestB = new StudentTestB();
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.schools = this.fb.group({
      name: [''],
      city: [''],
    });
    this.getSchools();
    this.getAllStduents();
    this.getAllDetails();
    this.getTestBResults();
  }
  exportStudents(): void {
    let element = document.getElementById('student-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'CareerDrishti-AdminDataSheet.xlsx');
  }

  getSchools() {
    this.schoolData=[];
    this.api.getSchools().subscribe((res) => {
      for(const r in res){
        this.schoolData.push({ ...res[r], id:r});
      }
      // this.schoolData = res.schoolDetails;
      // console.log(res);
    });
  }

  getAllStduents() {
    this.studentData=[];
    this.api.getStudents().subscribe((res) => {
      // this.studentData = res.studentDetails;
      for(const r in res){
        this.studentData.push(res[r]);
        // console.log(res[r]);
      }
      // this.studentData = res;
      // console.log(res);
    });
    // this.api.getStudentData().subscribe(res=>{
    //   console.log("Getting response: ",res)
    // },(error)=>{
    //   console.log(error)
    // });
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
    this.api.getTestDetails().subscribe((res) => {
      // this.testData = r.studentTestDetails;
      for(const r in res){
        this.testData.push({ ...res[r], id:r})
      }
      // console.log(r);
    });
  }

  getTestBResults() {
    this.testBData=[];
    this.api.getTestBDetails().subscribe((res) => {
      // this.testBData = r.studentTestDetails;

      for(const r in res){
        this.testBData.push({ ...res[r], id:r})
      }
      // console.log("testB ",res);
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
}
