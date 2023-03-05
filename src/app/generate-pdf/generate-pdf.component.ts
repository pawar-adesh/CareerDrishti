import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.component.html',
  styleUrls: ['./generate-pdf.component.css']
})
export class GeneratePdfComponent implements OnInit {
  public chart: any;
  fields=['Agriculture','Arts & Humanity', 'Commerce', 'Fine Arts', 'Health & Lifecycle', 'Technical', 'Uniform Service'];
  totalMarks: {[key: string]: number} = {'Agriculture':0,'Arts & Humanity':0, 'Commerce':0, 'Fine Arts':0, 'Health & Lifecycle':0, 'Technical':0, 'Uniform Service':0}
  myObject:any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.myObject = history.state.data;
    console.log(this.myObject);
    this.totalMarks['Agriculture']=this.myObject.agriculture;
    this.totalMarks['Arts & Humanity']=this.myObject.artsHumanity;
    this.totalMarks['Commerce']=this.myObject.commerce;
    this.totalMarks['Fine Arts']=this.myObject.fineart;
    this.totalMarks['Health & Lifecycle']=this.myObject.healthLifecycle;
    this.totalMarks['Technical']=this.myObject.technical;
    this.totalMarks['Uniform Service']=this.myObject.uniformServ;
    console.log(this.totalMarks);
    this.createChart();
  }

  printPdf(){
    window.print();
  }

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels:this.fields,
	       datasets: [
          {
            label: "",
            data: this.totalMarks,
            borderColor: "#eebcde",
            backgroundColor: "blue ",
          }
        ]
      },
      options: {
        aspectRatio:2.5,
    }

    });
  }

}
