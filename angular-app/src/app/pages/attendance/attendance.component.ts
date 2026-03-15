import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-attendance',
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Attendance Log</div>
        <div class="page-sub">Track daily attendance for all employees</div>
      </div>
      <button class="btn btn-primary" (click)="markPresent()">✅ Mark Me Present</button>
    </div>

    <div class="stats-grid" style="grid-template-columns:repeat(3,1fr)">
      <div class="stat-card">
        <div class="stat-icon-wrap" style="background:#ECFDF5;color:#10B981">✅</div>
        <div class="stat-body">
          <div class="stat-label">Present</div>
          <div class="stat-value">{{ count('Present') }}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap" style="background:#FEF2F2;color:#EF4444">❌</div>
        <div class="stat-body">
          <div class="stat-label">Absent</div>
          <div class="stat-value">{{ count('Absent') }}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap" style="background:#FFFBEB;color:#F59E0B">🌓</div>
        <div class="stat-body">
          <div class="stat-label">Half Day</div>
          <div class="stat-value">{{ count('Half Day') }}</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Attendance Records ({{ records.length }})</div>
      </div>
      <table class="data-table">
        <thead>
          <tr><th>Employee</th><th>Date</th><th>Status</th><th>Action</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let r of records">
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                <div class="avatar" style="background:#6366F1">{{ (r.employeeId?.name || 'U')[0] }}</div>
                <div class="fw-600">{{ r.employeeId?.name || 'Unknown' }}</div>
              </div>
            </td>
            <td class="text-muted">{{ r.date | date:'mediumDate' }}</td>
            <td>
              <span class="badge"
                [class.badge-green]="r.status==='Present'"
                [class.badge-red]="r.status==='Absent'"
                [class.badge-yellow]="r.status==='Half Day'"
                [class.badge-blue]="r.status==='Leave'">{{ r.status }}</span>
            </td>
            <td>
              <button class="btn btn-danger btn-icon" (click)="delete(r._id)" *ngIf="isAdmin">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="records.length === 0" class="empty-state">
        <div class="empty-state-icon">🕐</div>
        <div class="empty-state-text">No attendance records yet. Mark your attendance!</div>
      </div>
    </div>
  `
})
export class AttendanceComponent implements OnInit {
  records: any[] = [];
  get isAdmin() { return this.auth.isAdmin; }

  count(status: string) { return this.records.filter(r => r.status === status).length; }

  constructor(private api: ApiService, private auth: AuthService) {}
  ngOnInit() { this.load(); }
  load() { this.api.getAttendance().subscribe((r: any) => this.records = r); }

  markPresent() {
    this.api.markAttendance({ employeeId: this.auth.currentUserValue?.id, status: 'Present' })
      .subscribe(() => { alert('Attendance marked!'); this.load(); });
  }

  delete(id: string) {
    if (confirm('Delete this record?')) this.api.deleteAttendance(id).subscribe(() => this.load());
  }
}