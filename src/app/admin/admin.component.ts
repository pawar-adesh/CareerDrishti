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
import { Title } from '@angular/platform-browser';
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
    private router: Router,
    private titleService: Title) {
      this.titleService.setTitle("Sign in - Admin | Careerdrishti");
    }

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
      // console.log(res);
      this.userId = res['username'];
      this.password = res['password'];
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
