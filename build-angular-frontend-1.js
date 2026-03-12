const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'angular-app', 'src');

const dirs = [
  'app/pages/login',
  'app/pages/register',
  'app/pages/dashboard',
  'app/pages/employee-management',
  'app/pages/attendance',
  'app/pages/tasks',
  'app/pages/leaves',
  'app/pages/profile',
  'app/services',
  'app/components/navbar',
  'app/components/sidebar'
];

dirs.forEach(d => fs.mkdirSync(path.join(baseDir, d), { recursive: true }));

const files = {
  // === STYLES ===
  'styles.css': `
@import '~@angular/material/prebuilt-themes/indigo-pink.css';

:root {
  --primary: #4F46E5;
  --primary-dark: #4338CA;
  --secondary: #10B981;
  --dark: #1F2937;
  --light: #F3F4F6;
  --surface: #FFFFFF;
  --text-main: #111827;
  --text-muted: #6B7280;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

body, html {
  height: 100%;
  background-color: var(--light);
  color: var(--text-main);
}

.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4F46E5 0%, #10B981 100%);
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  text-align: center;
  transition: transform 0.3s ease;
}

.auth-card:hover {
  transform: translateY(-5px);
}

.auth-title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 2rem;
  color: var(--dark);
}

.full-width {
  width: 100%;
  margin-bottom: 1rem;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background: var(--primary) !important;
  color: white !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px;
  margin-top: 1rem;
  transition: all 0.3s ease !important;
}

.btn-primary:hover {
  background: var(--primary-dark) !important;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
}

.layout-wrapper {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 280px;
  background: var(--surface);
  box-shadow: 2px 0 10px rgba(0,0,0,0.05);
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 24px;
  border-bottom: 1px solid #E5E7EB;
}

.sidebar-brand {
  font-size: 20px;
  font-weight: 800;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-nav {
  padding: 20px 12px;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: var(--text-muted);
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-item mat-icon {
  margin-right: 12px;
}

.nav-item:hover, .nav-item.active {
  background: rgba(79, 70, 229, 0.1);
  color: var(--primary);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.topbar {
  height: 72px;
  background: var(--surface);
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.page-container {
  padding: 32px;
  flex: 1;
  overflow-y: auto;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--dark);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: var(--surface);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  background: rgba(79, 70, 229, 0.1);
  color: var(--primary);
}

.stat-info h3 {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 4px;
  font-weight: 600;
}

.stat-info p {
  font-size: 24px;
  font-weight: 800;
  color: var(--dark);
}

.table-container {
  background: var(--surface);
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  overflow: hidden;
  padding: 24px;
}

table {
  width: 100%;
}
`,

  // === INDEX.HTML ===
  'index.html': `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Office Management System</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
  <app-root></app-root>
</body>
</html>`,

  // === SERVICES ===
  'app/services/auth.service.ts': `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  get token() { return localStorage.getItem('token'); }
  get currentUserValue() { return this.currentUserSubject.value; }
  get isAdmin() { return this.currentUserValue?.role === 'Admin'; }

  register(data: any) {
    return this.http.post(\`\${this.apiUrl}/register\`, data);
  }

  login(credentials: any) {
    return this.http.post(\`\${this.apiUrl}/login\`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.currentUserSubject.next(res.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}`,

  'app/services/api.service.ts': `import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private get headers() {
    return {
      headers: new HttpHeaders({
        'Authorization': \`Bearer \${this.authService.token}\`
      })
    };
  }

  // Employees
  getEmployees() { return this.http.get(\`\${this.baseUrl}/employees\`, this.headers); }
  createEmployee(data: any) { return this.http.post(\`\${this.baseUrl}/employees\`, data, this.headers); }
  deleteEmployee(id: string) { return this.http.delete(\`\${this.baseUrl}/employees/\${id}\`, this.headers); }

  // Tasks
  getTasks() { return this.http.get(\`\${this.baseUrl}/tasks\`, this.headers); }
  createTask(data: any) { return this.http.post(\`\${this.baseUrl}/tasks\`, data, this.headers); }

  // Attendance
  getAttendance() { return this.http.get(\`\${this.baseUrl}/attendance\`, this.headers); }
  markAttendance(data: any) { return this.http.post(\`\${this.baseUrl}/attendance\`, data, this.headers); }

  // Leaves
  getLeaves() { return this.http.get(\`\${this.baseUrl}/leaves\`, this.headers); }
  applyLeave(data: any) { return this.http.post(\`\${this.baseUrl}/leaves\`, data, this.headers); }
  updateLeave(id: string, data: any) { return this.http.put(\`\${this.baseUrl}/leaves/\${id}\`, data, this.headers); }
}`,

  // === GUARD ===
  'app/auth.guard.ts': `import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.authService.token) return true;
    this.router.navigate(['/login']);
    return false;
  }
}`,

  // === ROUTING ===
  'app/app-routing.module.ts': `import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeManagementComponent } from './pages/employee-management/employee-management.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { LeavesComponent } from './pages/leaves/leaves.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeeManagementComponent, canActivate: [AuthGuard] },
  { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'leaves', component: LeavesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }`,

  // === APP MODULE ===
  'app/app.module.ts': `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeManagementComponent } from './pages/employee-management/employee-management.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { LeavesComponent } from './pages/leaves/leaves.component';
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
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }`,

  // === APP COMPONENT ===
  'app/app.component.ts': `import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: \`
    <div class="layout-wrapper" *ngIf="authService.currentUser$ | async as user; else authPages">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <app-navbar></app-navbar>
        <div class="page-container">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
    <ng-template #authPages>
      <router-outlet></router-outlet>
    </ng-template>
  \`
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}`,

  // === SIDEBAR ===
  'app/components/sidebar/sidebar.component.ts': `import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  template: \`
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-brand">
          <mat-icon>business</mat-icon>
          <span>OMS Portal</span>
        </div>
      </div>
      <div class="sidebar-nav">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
          <mat-icon>dashboard</mat-icon> Dashboard
        </a>
        <a *ngIf="isAdmin" routerLink="/employees" routerLinkActive="active" class="nav-item">
          <mat-icon>people</mat-icon> Employees
        </a>
        <a routerLink="/attendance" routerLinkActive="active" class="nav-item">
          <mat-icon>access_time</mat-icon> Attendance
        </a>
        <a routerLink="/tasks" routerLinkActive="active" class="nav-item">
          <mat-icon>assignment</mat-icon> Tasks
        </a>
        <a routerLink="/leaves" routerLinkActive="active" class="nav-item">
          <mat-icon>event_note</mat-icon> Leaves
        </a>
      </div>
    </div>
  \`
})
export class SidebarComponent {
  get isAdmin() { return this.authService.isAdmin; }
  constructor(public authService: AuthService) {}
}`,

  // === NAVBAR ===
  'app/components/navbar/navbar.component.ts': `import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  template: \`
    <div class="topbar">
      <div></div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <span style="font-weight: 500; color: var(--text-muted)">
          Ready, {{ (authService.currentUser$ | async)?.name }}
        </span>
        <button mat-icon-button (click)="logout()" color="warn">
          <mat-icon>logout</mat-icon>
        </button>
      </div>
    </div>
  \`
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
  logout() { this.authService.logout(); }
}`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(baseDir, filepath), content.trim());
}

console.log("Angular structural files generated.");
