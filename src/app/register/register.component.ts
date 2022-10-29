import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public termsCond : any ;
  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("onINIT",this.termsCond);
    // if(document.getElementById('terms')?.style.display)
    // console.log(document.getElementById('terms')?.style.display);
    // document.getElementById('terms').style.display = 'none';
  }

  onRegister(){

  }

}
