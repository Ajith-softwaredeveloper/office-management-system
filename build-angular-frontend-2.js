const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'angular-app', 'src', 'app', 'pages');

const files = {
  // === LOGIN ===
  'login/login.component.ts': `import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: \`
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Welcome Back</h1>
        <p style="color: var(--text-muted); margin-bottom: 2rem">Login to access your dashboard</p>
        
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Email Address</mat-label>
            <input matInput formControlName="email" type="email" placeholder="admin@example.com">
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" type="password">
          </mat-form-field>

          <button mat-flat-button color="primary" class="btn-primary" [disabled]="form.invalid || loading">
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p style="margin-top: 1.5rem; color: var(--text-muted)">
          Don't have an account? <a routerLink="/register" style="color: var(--primary); text-decoration: none; font-weight: 600">Register</a>
        </p>
      </div>
    </div>
  \`
})
export class LoginComponent {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.login(this.form.value).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        alert(err.error?.msg || 'Login failed');
        this.loading = false;
      }
    });
  }
}`,

  // === REGISTER ===
  'register/register.component.ts': `import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  template: \`
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Create Account</h1>
        
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Full Name</mat-label>
            <input matInput formControlName="name">
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Email Address</mat-label>
            <input matInput formControlName="email" type="email">
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" type="password">
          </mat-form-field>

          <button mat-flat-button class="btn-primary" [disabled]="form.invalid || loading">
            {{ loading ? 'Creating...' : 'Register' }}
          </button>
        </form>

        <p style="margin-top: 1.5rem; color: var(--text-muted)">
          Already have an account? <a routerLink="/login" style="color: var(--primary); text-decoration: none; font-weight: 600">Login</a>
        </p>
      </div>
    </div>
  \`
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.register(this.form.value).subscribe({
      next: () => {
        alert('Welcome! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error?.msg || 'Registration failed');
        this.loading = false;
      }
    });
  }
}`,

  // === DASHBOARD ===
  'dashboard/dashboard.component.ts': `import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  template: \`
    <h2 class="page-title">Dashboard Overview</h2>
    
    <div class="dashboard-grid">
      <div class="stat-card">
        <div class="stat-icon" style="color: #4F46E5; background: #EEEDFF">
          <mat-icon>people</mat-icon>
        </div>
        <div class="stat-info">
          <h3>TOTAL EMPLOYEES</h3>
          <p>--</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon" style="color: #10B981; background: #E1F8F0">
          <mat-icon>check_circle</mat-icon>
        </div>
        <div class="stat-info">
          <h3>PRESENT TODAY</h3>
          <p>--</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon" style="color: #F59E0B; background: #FEF3C7">
          <mat-icon>pending_actions</mat-icon>
        </div>
        <div class="stat-info">
          <h3>PENDING LEAVES</h3>
          <p>--</p>
        </div>
      </div>
    </div>

    <div class="table-container">
      <h3 style="margin-bottom: 16px; font-weight: 600">Welcome, {{ user?.name }}!</h3>
      <p style="color: var(--text-muted)">Your role is: {{ user?.role }}</p>
      <div style="margin-top: 20px; padding: 20px; background: #F3F4F6; border-radius: 8px;">
        <p>This is a dynamically generated Office Management System.</p>
        <p>Use the sidebar to explore Employees, Attendance, Tasks, and Leaves Modules!</p>
      </div>
    </div>
  \`
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(private auth: AuthService) {}
  ngOnInit() {
    this.user = this.auth.currentUserValue;
  }
}`,

  // === EMPLOYEE MANAGEMENT ===
  'employee-management/employee-management.component.ts': `import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-employees',
  template: \`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h2 class="page-title" style="margin: 0">Employees Directory</h2>
      <button mat-flat-button color="primary">+ Add Employee</button>
    </div>

    <div class="table-container">
      <table mat-table [dataSource]="employees">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let element" style="font-weight: 500"> {{element.name}} </td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef> Email </th>
          <td mat-cell *matCellDef="let element" style="color: var(--text-muted)"> {{element.email}} </td>
        </ng-container>

        <ng-container matColumnDef="department">
          <th mat-header-cell *matHeaderCellDef> Department </th>
          <td mat-cell *matCellDef="let element"> {{element.department || 'N/A'}} </td>
        </ng-container>

        <ng-container matColumnDef="position">
          <th mat-header-cell *matHeaderCellDef> Position </th>
          <td mat-cell *matCellDef="let element">
            <span style="background: #EEEDFF; color: #4F46E5; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
              {{element.position || 'Employee'}}
            </span>
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let element" style="text-align: right">
            <button mat-icon-button (click)="deleteEmp(element._id)" color="warn">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="['name', 'email', 'department', 'position', 'actions']"></tr>
        <tr mat-row *matRowDef="let row; columns: ['name', 'email', 'department', 'position', 'actions'];"></tr>
      </table>
      <div *ngIf="employees.length === 0" style="padding: 40px; text-align: center; color: var(--text-muted)">
        No employees found.
      </div>
    </div>
  \`
})
export class EmployeeManagementComponent implements OnInit {
  employees: any[] = [];
  constructor(private api: ApiService) {}

  ngOnInit() { this.load(); }
  
  load() {
    this.api.getEmployees().subscribe((res: any) => this.employees = res);
  }

  deleteEmp(id: string) {
    if(confirm('Are you sure?')) {
      this.api.deleteEmployee(id).subscribe(() => this.load());
    }
  }
}`,

  // === ATTENDANCE ===
  'attendance/attendance.component.ts': `import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-attendance',
  template: \`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h2 class="page-title" style="margin: 0">Attendance Log</h2>
      <button mat-flat-button color="primary" (click)="markPresent()">Mark Attendance Today</button>
    </div>

    <div class="table-container">
      <table mat-table [dataSource]="records">
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef> Date </th>
          <td mat-cell *matCellDef="let element"> {{ element.date | date:'mediumDate' }} </td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Employee </th>
          <td mat-cell *matCellDef="let element" style="font-weight: 500"> {{ element.employeeId?.name || 'Unknown' }} </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef> Status </th>
          <td mat-cell *matCellDef="let element">
            <span style="background: #E1F8F0; color: #10B981; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
              {{ element.status }}
            </span>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="['date', 'name', 'status']"></tr>
        <tr mat-row *matRowDef="let row; columns: ['date', 'name', 'status'];"></tr>
      </table>
    </div>
  \`
})
export class AttendanceComponent implements OnInit {
  records: any[] = [];
  constructor(private api: ApiService, private auth: AuthService) {}
  
  ngOnInit() { this.load(); }
  
  load() {
    this.api.getAttendance().subscribe((res: any) => this.records = res);
  }

  markPresent() {
    this.api.markAttendance({
      employeeId: this.auth.currentUserValue.id,
      status: 'Present'
    }).subscribe(() => {
      alert('Attendance Marked!');
      this.load();
    });
  }
}`,

  // === TASKS ===
  'tasks/tasks.component.ts': `import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tasks',
  template: \`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h2 class="page-title" style="margin: 0">Task Board</h2>
      <button mat-flat-button color="primary">+ New Task</button>
    </div>

    <div class="dashboard-grid">
      <div class="stat-card" *ngFor="let task of tasks" style="display: block;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <h3 style="margin:0; font-size: 16px; font-weight: 600">{{task.title}}</h3>
          <span style="font-size: 12px; background: #FEF3C7; color: #F59E0B; padding: 2px 8px; border-radius: 10px;">{{task.status}}</span>
        </div>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 12px;">{{task.description || 'No description provided.'}}</p>
        <div style="font-size: 13px; font-weight: 500;">
          Assigned to: <span style="color: var(--primary)">{{task.assignedTo?.name}}</span>
        </div>
      </div>
      <div *ngIf="tasks.length === 0" style="padding: 40px; text-align: center; color: var(--text-muted); grid-column: 1 / -1; background: white; border-radius: 16px;">
        No tasks assigned yet.
      </div>
    </div>
  \`
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit() {
    this.api.getTasks().subscribe((res: any) => this.tasks = res);
  }
}`,

  // === LEAVES ===
  'leaves/leaves.component.ts': `import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-leaves',
  template: \`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h2 class="page-title" style="margin: 0">Leave Requests</h2>
      <button mat-flat-button color="primary" (click)="applyRandomLeave()">+ Apply Leave</button>
    </div>

    <div class="table-container">
      <table mat-table [dataSource]="leaves">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Employee </th>
          <td mat-cell *matCellDef="let element"> {{ element.employeeId?.name }} </td>
        </ng-container>

        <ng-container matColumnDef="reason">
          <th mat-header-cell *matHeaderCellDef> Reason </th>
          <td mat-cell *matCellDef="let element" style="font-weight: 500"> {{ element.reason }} </td>
        </ng-container>

        <ng-container matColumnDef="dates">
          <th mat-header-cell *matHeaderCellDef> Duration </th>
          <td mat-cell *matCellDef="let element" style="color: var(--text-muted)"> 
            {{ element.startDate | date:'shortDate' }} - {{ element.endDate | date:'shortDate' }} 
          </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef> Status </th>
          <td mat-cell *matCellDef="let element">
            <span [ngStyle]="{'background': element.status === 'Approved' ? '#E1F8F0' : '#FCE8E8', 'color': element.status === 'Approved' ? '#10B981' : '#EF4444'}" style="padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
              {{ element.status }}
            </span>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="['name', 'reason', 'dates', 'status']"></tr>
        <tr mat-row *matRowDef="let row; columns: ['name', 'reason', 'dates', 'status'];"></tr>
      </table>
      <div *ngIf="leaves.length === 0" style="padding: 40px; text-align: center; color: var(--text-muted)">
        No leave records found.
      </div>
    </div>
  \`
})
export class LeavesComponent implements OnInit {
  leaves: any[] = [];
  constructor(private api: ApiService, private auth: AuthService) {}
  ngOnInit() { this.load(); }
  
  load() {
    this.api.getLeaves().subscribe((res: any) => this.leaves = res);
  }

  applyRandomLeave() {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 2);

    this.api.applyLeave({
      employeeId: this.auth.currentUserValue.id,
      reason: 'Sick Leave / Personal',
      startDate: start,
      endDate: end
    }).subscribe(() => {
      alert('Leave applied successfully!');
      this.load();
    });
  }
}`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(baseDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim());
}

console.log("Angular page components generated.");
