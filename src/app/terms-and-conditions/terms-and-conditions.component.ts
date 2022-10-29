import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {
  public showForm: boolean = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  getPasskey(event:any){
    if(event.target.checked==true){
      // document.getElementById('passkeyContainer')!.style.display='block'
      this.showForm=true;
    }
    else{
      this.showForm = false;
    }
  }
}
