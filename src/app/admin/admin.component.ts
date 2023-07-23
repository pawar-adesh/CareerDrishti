import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  userId!: string;
  password!: string;
  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // console.log(this.api.GetAdminCreds);
    this.loginForm = new FormGroup({
      username: new FormControl(),
      formpassword: new FormControl(),
    });
  }

  login() {
    // console.log(this.loginForm.value.username);
    this.api.GetAdminCreds().subscribe((res) => {
      //console.log(res);
      this.userId = res.adminCreds[0].username;
      this.password = res.adminCreds[0].password;
      // console.log(this.userId,this.password);

      if (
        this.userId === this.loginForm.value.username &&
        this.password === this.loginForm.value.formpassword
      ) {
        alert('login success!');
        this.router.navigate(['adminDashboard']);
        this.loginForm.reset();
      } else {
        alert('login failed!!');
      }
    });
  }
}
