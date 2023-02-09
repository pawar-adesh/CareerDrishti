import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageTestsComponent } from './manage-tests/manage-tests.component';
import { StudentComponent } from './student/student.component';
import {TestComponent} from './test/test.component';
// import { StudentDataComponent } from './student-data/student-data.component';
// import { TestDetailsComponent } from './test-details/test-details.component';

const routes: Routes = [
  {path:'', component:StudentComponent},
  {path:'admin', component:AdminComponent},
  {path:'adminDashboard', component:AdminDashboardComponent},
  {path:'manageTest', component:ManageTestsComponent},
  {path:'test', component: TestComponent},
  // {path:'studentData', component: StudentDataComponent},
  // {path:'testDetails', component: TestDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
