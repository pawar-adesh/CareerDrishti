import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CanComponentDeactivate } from '../test/test.guard';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-section-nav',
  templateUrl: './section-nav.component.html',
  styleUrls: ['./section-nav.component.css'],
})
export class SectionNavComponent implements OnInit, CanComponentDeactivate {
  id = 'tsparticles';
  isTermsAccepted!: boolean;
  disablestep1: boolean = false;
  currentUser: any;
  submitClicked = false;
  disablestep2: boolean = true;
  aptitudeInstruction = new FormControl(
    { value: '', disabled: true },
    Validators.required
  );

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('user');
    if (this.currentUser == null) {
      this.router.navigate(['/register']);
      this.submitClicked = true;
    }
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.submitClicked == true) {
      return true;
    } else {
      alert('Please complete the test before leaving.');
      return false;
    }
  }
  test1submit = new FormControl(
    { value: '', disabled: false },
    Validators.required
  );
  constructor(private router: Router) {}

  enableStep2() {
    this.disablestep2 = false;
    this.disablestep1 = true;
    this.aptitudeInstruction.enable();
    this.test1submit.disable();
  }

  displayAptiQuestions(event: Event) {
    var e = <HTMLInputElement>document.getElementById('checkAptiInstruct');
    if (e.checked) {
      this.isTermsAccepted = true;
    } else {
      this.isTermsAccepted = false;
    }
  }
}
