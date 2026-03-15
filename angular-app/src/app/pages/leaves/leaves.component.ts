import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-leaves',
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Leave Requests</div>
        <div class="page-sub">Apply and manage employee leave</div>
      </div>
      <button class="btn btn-primary" (click)="openModal()">+ Apply Leave</button>
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr><th>Employee</th><th>Type</th><th>Reason</th><th>Duration</th><th>Days</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let l of leaves">
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                <div class="avatar" style="background:#6366F1">{{ (l.employeeId?.name || 'U')[0] }}</div>
                <div>
                  <div class="fw-600">{{ l.employeeId?.name || '—' }}</div>
                  <div class="text-muted text-sm">{{ l.employeeId?.email }}</div>
                </div>
              </div>
            </td>
            <td><span class="badge badge-blue">{{ l.leaveType || 'Casual' }}</span></td>
            <td>{{ l.reason }}</td>
            <td class="text-muted">{{ l.startDate | date:'shortDate' }} → {{ l.endDate | date:'shortDate' }}</td>
            <td><span class="badge badge-gray">{{ l.days || 1 }}d</span></td>
            <td>
              <span class="badge" [class.badge-yellow]="l.status==='Pending'" [class.badge-green]="l.status==='Approved'" [class.badge-red]="l.status==='Rejected'">{{ l.status }}</span>
            </td>
            <td>
              <div style="display:flex;gap:6px" *ngIf="isAdmin">
                <button class="btn btn-success btn-icon" (click)="approve(l)" *ngIf="l.status==='Pending'" title="Approve">✅</button>
                <button class="btn btn-danger btn-icon" (click)="reject(l)" *ngIf="l.status==='Pending'" title="Reject">❌</button>
                <button class="btn btn-danger btn-icon" (click)="deleteLeave(l._id)" title="Delete">🗑️</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="leaves.length === 0" class="empty-state">
        <div class="empty-state-icon">📅</div>
        <div class="empty-state-text">No leave requests found</div>
      </div>
    </div>

    <div class="modal-overlay" *ngIf="modal" (click)="closeModal($event)">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title">Apply for Leave</div>
          <button class="btn-close" (click)="modal=false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Leave Type</label>
              <select class="form-select" [(ngModel)]="form.leaveType">
                <option>Sick</option><option>Casual</option><option>Earned</option><option>Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Reason *</label>
              <input class="form-input" [(ngModel)]="form.reason" placeholder="Brief reason...">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Start Date *</label>
              <input class="form-input" [(ngModel)]="form.startDate" type="date">
            </div>
            <div class="form-group">
              <label class="form-label">End Date *</label>
              <input class="form-input" [(ngModel)]="form.endDate" type="date">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" (click)="modal=false">Cancel</button>
          <button class="btn btn-primary" (click)="apply()" [disabled]="!form.reason || !form.startDate || !form.endDate">Submit Request</button>
        </div>
      </div>
    </div>
  `
})
export class LeavesComponent implements OnInit {
  leaves: any[] = [];
  modal = false;
  form: any = { leaveType:'Casual', reason:'', startDate:'', endDate:'' };

  get isAdmin() { return true; }

  constructor(private api: ApiService, private auth: AuthService) {}
  ngOnInit() { this.load(); }
  load() { this.api.getLeaves().subscribe((r: any) => this.leaves = r); }

  openModal() {
    this.form = { leaveType:'Casual', reason:'', startDate:'', endDate:'' };
    this.modal = true;
  }

  closeModal(e: any) { if (e.target === e.currentTarget) this.modal = false; }

  apply() {
    const data = { ...this.form, employeeId: this.auth.currentUserValue?.id };
    this.api.applyLeave(data).subscribe(() => { this.modal = false; this.load(); });
  }

  approve(l: any) { this.api.updateLeave(l._id, { status: 'Approved' }).subscribe(() => this.load()); }
  reject(l: any) { this.api.updateLeave(l._id, { status: 'Rejected' }).subscribe(() => this.load()); }
  deleteLeave(id: string) {
    if (confirm('Delete this leave request?')) this.api.deleteLeave(id).subscribe(() => this.load());
  }
}