import { Component, OnInit } from '@angular/core';
import { Router, Route, ParamMap } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  startTest(){
    console.log("clicking");
    this.router.navigate(['/register'])
  }


}
