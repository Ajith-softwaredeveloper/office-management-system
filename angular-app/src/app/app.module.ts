import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeManagementComponent } from './pages/employee-management/employee-management.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { LeavesComponent } from './pages/leaves/leaves.component';
import { StaffComponent } from './pages/staff/staff.component';
import { LeaveCalculationsComponent } from './pages/leave-calculations/leave-calculations.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    EmployeeManagementComponent,
    AttendanceComponent,
    TasksComponent,
    LeavesComponent,
    StaffComponent,
    LeaveCalculationsComponent,
    ArticlesComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }