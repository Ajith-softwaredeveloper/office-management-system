import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
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
  `
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(private auth: AuthService) {}
  ngOnInit() {
    this.user = this.auth.currentUserValue;
  }
}