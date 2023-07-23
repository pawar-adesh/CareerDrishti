import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageTestsComponent } from './manage-tests/manage-tests.component';
import { StudentComponent } from './student/student.component';
import { TestComponent } from './test/test.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { GeneratePdfComponent } from './generate-pdf/generate-pdf.component';
import { TestSectionBComponent } from './test-section-b/test-section-b.component';
import { AgricultureComponent } from './agriculture/agriculture.component';
import { SectionNavComponent } from './section-nav/section-nav.component';
import { TestGuard } from './test/test.guard';
import { TestCompleteComponent } from './test-complete/test-complete.component';
// import { StudentDataComponent } from './student-data/student-data.component';
// import { TestDetailsComponent } from './test-details/test-details.component';

const routes: Routes = [
  // { path: '', redirectTo:'/home', pathMatch:'full'},
  // {path:'home',component: StudentComponent },
  {path:'', component: StudentComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'adminDashboard', component: AdminDashboardComponent },
  { path: 'manageTest', component: ManageTestsComponent },
  { path: 'test', component: TestComponent, canDeactivate: [TestGuard], canActivate: [TestGuard] },
  { path: 'register', component: RegisterStudentComponent },
  { path: 'generatePDF', component: GeneratePdfComponent },
  { path: 'test/aptitude', component: TestSectionBComponent, canDeactivate: [TestGuard], canActivate: [TestGuard] },
  { path: 'exploreFields', component: AgricultureComponent },
  { path: 'instructions', component: SectionNavComponent },
  { path: 'testComplete', component: TestCompleteComponent, canDeactivate: [TestGuard]},
  // {path:'studentData', component: StudentDataComponent},
  // {path:'testDetails', component: TestDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
