import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Welcome back, {{ user?.name }}! 👋</div>
        <div class="page-sub">Here's what's happening at your office today</div>
      </div>
      <div style="font-size:13px;color:var(--gray-500)">{{ today }}</div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon-wrap" style="background:#EEF2FF;color:#6366F1">👥</div>
        <div class="stat-body">
          <div class="stat-label">Total Staff</div>
          <div class="stat-value">{{ stats.staff }}</div>
          <div class="stat-change">Active members</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap" style="background:#ECFDF5;color:#10B981">🕐</div>
        <div class="stat-body">
          <div class="stat-label">Present Today</div>
          <div class="stat-value">{{ stats.attendance }}</div>
          <div class="stat-change">Attendance records</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap" style="background:#FFFBEB;color:#F59E0B">📅</div>
        <div class="stat-body">
          <div class="stat-label">Pending Leaves</div>
          <div class="stat-value">{{ stats.pendingLeaves }}</div>
          <div class="stat-change">Awaiting approval</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap" style="background:#EFF6FF;color:#3B82F6">✅</div>
        <div class="stat-body">
          <div class="stat-label">Open Tasks</div>
          <div class="stat-value">{{ stats.tasks }}</div>
          <div class="stat-change">In progress</div>
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div class="card">
        <div class="card-header">
          <div class="card-title">📢 Recent Announcements</div>
        </div>
        <div style="padding:16px">
          <div *ngFor="let a of articles" style="padding:12px;border-bottom:1px solid var(--border);last-child{border:none}">
            <div class="fw-600" style="font-size:14px;color:var(--dark)">{{ a.title }}</div>
            <div class="text-muted mt-1">{{ a.category }} · {{ a.createdAt | date:'shortDate' }}</div>
          </div>
          <div *ngIf="articles.length === 0" class="empty-state">
            <div class="empty-state-icon">📢</div>
            <div class="empty-state-text">No announcements yet</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">📋 Recent Leave Requests</div>
        </div>
        <div style="padding:16px">
          <div *ngFor="let l of leaves" style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)">
            <div>
              <div class="fw-600" style="font-size:14px">{{ l.employeeId?.name }}</div>
              <div class="text-muted">{{ l.reason }}</div>
            </div>
            <span class="badge" [class.badge-yellow]="l.status==='Pending'" [class.badge-green]="l.status==='Approved'" [class.badge-red]="l.status==='Rejected'">{{ l.status }}</span>
          </div>
          <div *ngIf="leaves.length === 0" class="empty-state">
            <div class="empty-state-icon">📅</div>
            <div class="empty-state-text">No leave requests</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  user: any;
  today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  stats = { staff: 0, attendance: 0, pendingLeaves: 0, tasks: 0 };
  articles: any[] = [];
  leaves: any[] = [];

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.currentUserValue;
    this.api.getStaffs().subscribe((r: any) => this.stats.staff = r.length);
    this.api.getAttendance().subscribe((r: any) => this.stats.attendance = r.length);
    this.api.getLeaves().subscribe((r: any) => {
      this.stats.pendingLeaves = r.filter((l: any) => l.status === 'Pending').length;
      this.leaves = r.slice(0, 5);
    });
    this.api.getTasks().subscribe((r: any) => this.stats.tasks = r.filter((t: any) => t.status !== 'Completed').length);
    this.api.getArticles().subscribe((r: any) => this.articles = r.slice(0, 4));
  }
}