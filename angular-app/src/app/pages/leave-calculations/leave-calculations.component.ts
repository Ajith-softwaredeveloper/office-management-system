import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-leave-calculations',
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Leave Summary</div>
        <div class="page-sub">Annual leave balance for each staff member</div>
      </div>
      <button class="btn btn-primary" (click)="openModal()">+ Add Record</button>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Leave Calculations ({{ records.length }})</div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Staff Member</th>
            <th>Year</th>
            <th>Total</th>
            <th>Used</th>
            <th>Sick</th>
            <th>Casual</th>
            <th>Earned</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let r of records">
            <td class="fw-600">{{ r.staffId?.name || r.staffName || '—' }}</td>
            <td>{{ r.year }}</td>
            <td>{{ r.totalLeavesDays }}</td>
            <td><span class="badge badge-red">{{ r.usedLeavesDays }}</span></td>
            <td>{{ r.sickLeaves }}</td>
            <td>{{ r.casualLeaves }}</td>
            <td>{{ r.earnedLeaves }}</td>
            <td><span class="badge badge-green">{{ r.totalLeavesDays - r.usedLeavesDays }}</span></td>
            <td>
              <div style="display:flex;gap:6px">
                <button class="btn btn-secondary btn-icon" (click)="editRecord(r)">✏️</button>
                <button class="btn btn-danger btn-icon" (click)="delete(r._id)">🗑️</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="records.length === 0" class="empty-state">
        <div class="empty-state-icon">🧮</div>
        <div class="empty-state-text">No leave calculations yet</div>
      </div>
    </div>

    <div class="modal-overlay" *ngIf="modal" (click)="closeModal($event)">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title">{{ editing ? 'Edit Record' : 'Add Leave Record' }}</div>
          <button class="btn-close" (click)="modal=false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Staff Name</label>
              <input class="form-input" [(ngModel)]="form.staffName" placeholder="Staff member name">
            </div>
            <div class="form-group">
              <label class="form-label">Year</label>
              <input class="form-input" [(ngModel)]="form.year" type="number">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Total Leave Days</label>
              <input class="form-input" [(ngModel)]="form.totalLeavesDays" type="number">
            </div>
            <div class="form-group">
              <label class="form-label">Used Leave Days</label>
              <input class="form-input" [(ngModel)]="form.usedLeavesDays" type="number">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Sick Leaves</label>
              <input class="form-input" [(ngModel)]="form.sickLeaves" type="number">
            </div>
            <div class="form-group">
              <label class="form-label">Casual Leaves</label>
              <input class="form-input" [(ngModel)]="form.casualLeaves" type="number">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Earned Leaves</label>
            <input class="form-input" [(ngModel)]="form.earnedLeaves" type="number">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" (click)="modal=false">Cancel</button>
          <button class="btn btn-primary" (click)="save()">{{ editing ? 'Save Changes' : 'Add Record' }}</button>
        </div>
      </div>
    </div>
  `
})
export class LeaveCalculationsComponent implements OnInit {
  records: any[] = [];
  modal = false;
  editing: any = null;
  form: any = { staffName:'', year: new Date().getFullYear(), totalLeavesDays:20, usedLeavesDays:0, sickLeaves:0, casualLeaves:0, earnedLeaves:0 };

  constructor(private api: ApiService) {}
  ngOnInit() { this.load(); }

  load() { this.api.getLeaveCalculations().subscribe((r: any) => this.records = r); }

  openModal() {
    this.editing = null;
    this.form = { staffName:'', year: new Date().getFullYear(), totalLeavesDays:20, usedLeavesDays:0, sickLeaves:0, casualLeaves:0, earnedLeaves:0 };
    this.modal = true;
  }

  editRecord(r: any) { this.editing = r; this.form = { ...r }; this.modal = true; }
  closeModal(e: any) { if (e.target === e.currentTarget) this.modal = false; }

  save() {
    const req = this.editing
      ? this.api.updateLeaveCalculation(this.editing._id, this.form)
      : this.api.createLeaveCalculation(this.form);
    req.subscribe(() => { this.modal = false; this.load(); });
  }

  delete(id: string) {
    if (confirm('Delete this record?')) {
      this.api.getLeaveCalculations().subscribe(() => this.load());
    }
  }
}
