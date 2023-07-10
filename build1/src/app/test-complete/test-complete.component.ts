import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate } from '../test/test.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-complete',
  templateUrl: './test-complete.component.html',
  styleUrls: ['./test-complete.component.css'],
})
export class TestCompleteComponent implements OnInit, CanComponentDeactivate {
  goToHome = false;
  constructor() {}

  ngOnInit(): void {}

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.goToHome == true) {
      return true;
    } else {
      alert('Access Denied! The test is already submitted.');
      return false;
    }
  }

  enableHome() {
    this.goToHome = true;
  }
}
