import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageTestsComponent } from './manage-tests/manage-tests.component';
import { StudentComponent } from './student/student.component';
import { TestComponent } from './test/test.component';
// import { StudentDataComponent } from './student-data/student-data.component';
// import { TestDetailsComponent } from './test-details/test-details.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminDashboardComponent,
    ManageTestsComponent,
    StudentComponent,
    TestComponent
    // StudentDataComponent,
    // TestDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
