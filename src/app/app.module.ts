import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageTestsComponent } from './manage-tests/manage-tests.component';
import { StudentComponent } from './student/student.component';
import { TestComponent } from './test/test.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneratePdfComponent } from './generate-pdf/generate-pdf.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TestSectionBComponent } from './test-section-b/test-section-b.component';
import { AgricultureComponent } from './agriculture/agriculture.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SectionNavComponent } from './section-nav/section-nav.component';
import { MatStepperModule } from '@angular/material/stepper';
import { NgParticlesModule } from "ng-particles";
import { TestGuard } from './test/test.guard';
import { TestCompleteComponent } from './test-complete/test-complete.component';
// import { StudentDataComponent } from './student-data/student-data.component';
// import { TestDetailsComponent } from './test-details/test-details.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminDashboardComponent,
    ManageTestsComponent,
    StudentComponent,
    TestComponent,
    RegisterStudentComponent,
    GeneratePdfComponent,
    TestSectionBComponent,
    AgricultureComponent,
    SectionNavComponent,
    TestCompleteComponent,
    // StudentDataComponent,
    // TestDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatExpansionModule,
    MatStepperModule,
    NgParticlesModule
  ],
  providers: [TestGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
