import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from '../api.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { numbers } from '@material/dialog';

@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.component.html',
  styleUrls: ['./generate-pdf.component.css'],
})
export class GeneratePdfComponent implements OnInit {
  public chart: any;
  public chart2: any;
  public name: string = '';
  public fname: string = '';
  public mname: string = '';
  public lname: string = '';
  public std: string = '';
  fields = [
    'AGRICULTURE',
    ['ARTS &', 'HUMANITIES'],
    'COMMERCE',
    'FINE ARTS',
    ['HEALTH &', 'LIFE SCIENCES'],
    'TECHNICAL',
    ['UNIFORMED', 'SERVICES'],
  ];
  topics = [
    ['LOGICAL', 'APTITUDE'],
    ['VERBAL', 'APTITUDE'],
    ['SPATIAL', 'APTITUDE'],
    ['NUMERICAL', 'APTITUDE'],
  ];
  // aptiMarks :{ [key:string]: number} = {
  //   'LOGICAL APTITUDE':0,
  //   'VERBAL APTITUDE':0,
  //   'SPATIAL APTITUDE':0,
  //   'NUMERICAL APTITUDE':0
  // };
  // totalMarks: { [key: string]: number } = {
  //   AGRICULTURE: 0,
  //   'ARTS & HUMANITIES': 0,
  //   COMMERCE: 0,
  //   'FINE ARTS': 0,
  //   'HEALTH & LIFE SCIENCES': 0,
  //   TECHNICAL: 0,
  //   'UNIFORMED SERVICES': 0,
  // };
  myObject: any;
  AptiTest: any;
  dataArray: number[] = [];
  dataArrayB: number[] = [];
  constructor(private route: ActivatedRoute, private api: ApiService) {}
  @ViewChild('content', { static: false }) content!: ElementRef;

  ngOnInit(): void {
    this.myObject = history.state.data.param1;
    // console.log(this.myObject);
    // this.totalMarks['AGRICULTURE'] = this.myObject.agriculture;
    // this.totalMarks['ARTS & HUMANITIES'] = this.myObject.artsHumanity;
    // this.totalMarks['COMMERCE'] = this.myObject.commerce;
    // this.totalMarks['FINE ARTS'] = this.myObject.fineart;
    // this.totalMarks['HEALTH & LIFE SCIENCES'] = this.myObject.healthLifecycle;
    // this.totalMarks['TECHNICAL'] = this.myObject.technical;
    // this.totalMarks['UNIFORMED SERVICES'] = this.myObject.uniformServ;
    // console.log(this.totalMarks);

    this.dataArray[0] = this.myObject.agriculture.toFixed(0);
    this.dataArray[1] = this.myObject.artsHumanity.toFixed(0);
    this.dataArray[2] = this.myObject.commerce.toFixed(0);
    this.dataArray[3] = this.myObject.fineart.toFixed(0);
    this.dataArray[4] = this.myObject.healthLifecycle.toFixed(0);
    this.dataArray[5] = this.myObject.technical.toFixed(0);
    this.dataArray[6] = this.myObject.uniformServ.toFixed(0);

    this.AptiTest = history.state.data.param2;
    // console.log(this.AptiTest);
    // this.aptiMarks['LOGICAL APTITUDE'] = this.AptiTest.aptitude;
    // this.aptiMarks['VERBAL APTITUDE'] = this.AptiTest.verbal;
    // this.aptiMarks['NUMERICAL APTITUDE'] = this.AptiTest.numerical;
    // this.aptiMarks['SPATIAL APTITUDE'] = this.AptiTest.spatial;

    this.dataArrayB[0] = this.AptiTest.aptitude;
    this.dataArrayB[1] = this.AptiTest.verbal;
    this.dataArrayB[2] = this.AptiTest.spatial;
    this.dataArrayB[3] = this.AptiTest.numerical;

    this.createChart();
    this.createChart2();
    this.api.getStandard(this.myObject.email).subscribe((res) => {
      this.name = res.firstname + res.lastname;
      this.fname = res.firstname;
      this.mname = res.middlename;
      this.lname = res.lastname;
      this.std = res.standard;
    });
  }

  printPdf() {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const content = this.content.nativeElement;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(this.name + '.pdf');
    });
  }

  createChart() {
    Chart.register(ChartDataLabels);
    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.fields,
        datasets: [
          {
            label: '',
            data: this.dataArray,
            borderColor: [
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
              '#000000',
            ],
            backgroundColor: [
              '#538135',
              '#FFC000',
              '#2E74B5',
              '#E44E72',
              '#794D8D',
              '#F09456',
              '#815E11',
            ],
            borderWidth: 1,
            barPercentage: 0.5,
            categoryPercentage: 0.5,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'top',
            font: {
              weight: 'bold',
            },
            color: 'black',
          },
          legend: {
            display: false, // Hide the legend if needed
          },
        },
        layout: {
          padding: {
            top: 20, // Adjust top padding as needed
            right: 20, // Adjust right padding as needed
            bottom: 20, // Adjust bottom padding as needed
            left: 20, // Adjust left padding as needed
          },
        },
        scales: {
          x: {
            offset: true,
            grid: {
              drawTicks: false,
              display:false,
            },
            ticks: {
              color: 'black',
              padding: 10,
              font:{
                size:9,
              }
            },
          },
          y: {
            beginAtZero: true,
            display: true,
            grid: {
              display: true,
            },
            min: 0,
            max: 100,
            ticks: {
              stepSize: 10
            }
          },
        },
      },
    });
  }

  createChart2() {
    Chart.register(ChartDataLabels);
    this.chart2 = new Chart('MyChart2', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.topics,
        datasets: [
          {
            label: '',
            data: this.dataArrayB,
            borderColor: ['#000000'],
            backgroundColor: ['#745E54'],
            borderWidth: 1,
            barPercentage: 0.5,
            categoryPercentage: 0.5,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'top',
            font: {
              weight: 'bold',
            },
            color: 'black',
          },
          legend: {
            display: false,
          },
        },
        layout: {
          padding: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          },
        },
        scales: {
          x: {
            offset: true,
            grid: {
              drawTicks: false,
              display:false,
            },
            ticks: {
              color: 'black',
              padding: 10,
            },
          },
          y: {
            display: true,
            grid: {
              display: true,
            },
            min: 0,
            max: 10,
          },
        },
      },
    });
  }
}
