import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-staff',
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Staff Directory</div>
        <div class="page-sub">Manage all staff members in one place</div>
      </div>
      <button class="btn btn-primary" (click)="openModal()">+ Add Staff</button>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">All Staff ({{ staffs.length }})</div>
        <div class="search-bar">
          <span class="search-icon">🔍</span>
          <input [(ngModel)]="search" placeholder="Search name, dept...">
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Staff Member</th>
            <th>Department</th>
            <th>Position</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let s of filtered">
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                <div class="avatar" [style.background]="color(s.name)">{{ s.name[0] }}</div>
                <div>
                  <div class="fw-600">{{ s.name }}</div>
                  <div class="text-muted text-sm">{{ s.email }}</div>
                </div>
              </div>
            </td>
            <td>{{ s.department || '—' }}</td>
            <td><span class="badge badge-purple">{{ s.position || 'Staff' }}</span></td>
            <td class="text-muted">{{ s.phone || '—' }}</td>
            <td>
              <span class="badge" [class.badge-green]="s.status==='Active'" [class.badge-yellow]="s.status==='On Leave'" [class.badge-gray]="s.status==='Inactive'">{{ s.status }}</span>
            </td>
            <td>
              <div style="display:flex;gap:6px">
                <button class="btn btn-secondary btn-icon" (click)="editStaff(s)" title="Edit">✏️</button>
                <button class="btn btn-danger btn-icon" (click)="delete(s._id)" title="Delete">🗑️</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="filtered.length === 0" class="empty-state">
        <div class="empty-state-icon">👥</div>
        <div class="empty-state-text">No staff found. Add your first staff member!</div>
      </div>
    </div>

    <div class="modal-overlay" *ngIf="modal" (click)="closeModal($event)">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title">{{ editing ? 'Edit Staff' : 'Add New Staff' }}</div>
          <button class="btn-close" (click)="modal=false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input class="form-input" [(ngModel)]="form.name" placeholder="Jane Smith">
            </div>
            <div class="form-group">
              <label class="form-label">Email *</label>
              <input class="form-input" [(ngModel)]="form.email" type="email" placeholder="jane@company.com">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input class="form-input" [(ngModel)]="form.phone" placeholder="+91 9876543210">
            </div>
            <div class="form-group">
              <label class="form-label">Department</label>
              <select class="form-select" [(ngModel)]="form.department">
                <option value="">Select...</option>
                <option>Engineering</option><option>Sales</option><option>HR</option>
                <option>Finance</option><option>Operations</option><option>Marketing</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Position</label>
              <input class="form-input" [(ngModel)]="form.position" placeholder="Senior Developer">
            </div>
            <div class="form-group">
              <label class="form-label">Status</label>
              <select class="form-select" [(ngModel)]="form.status">
                <option>Active</option><option>Inactive</option><option>On Leave</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Salary (₹)</label>
            <input class="form-input" [(ngModel)]="form.salary" type="number" placeholder="50000">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" (click)="modal=false">Cancel</button>
          <button class="btn btn-primary" (click)="saveStaff()" [disabled]="!form.name || !form.email">
            {{ editing ? 'Save Changes' : 'Add Staff' }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class StaffComponent implements OnInit {
  staffs: any[] = [];
  search = '';
  modal = false;
  editing: any = null;
  form: any = { name:'', email:'', phone:'', department:'', position:'', status:'Active', salary:0 };

  get filtered() {
    if (!this.search) return this.staffs;
    const q = this.search.toLowerCase();
    return this.staffs.filter(s => s.name?.toLowerCase().includes(q) || s.department?.toLowerCase().includes(q));
  }

  color(name: string) {
    const colors = ['#6366F1','#10B981','#F59E0B','#EF4444','#3B82F6','#8B5CF6','#EC4899'];
    return colors[name.charCodeAt(0) % colors.length];
  }

  constructor(private api: ApiService) {}
  ngOnInit() { this.load(); }

  load() { this.api.getStaffs().subscribe((r: any) => this.staffs = r); }

  openModal() {
    this.editing = null;
    this.form = { name:'', email:'', phone:'', department:'', position:'', status:'Active', salary:0 };
    this.modal = true;
  }

  editStaff(s: any) {
    this.editing = s;
    this.form = { ...s };
    this.modal = true;
  }

  closeModal(e: any) { if (e.target === e.currentTarget) this.modal = false; }

  saveStaff() {
    const req = this.editing
      ? this.api.updateStaff(this.editing._id, this.form)
      : this.api.createStaff(this.form);
    req.subscribe(() => { this.modal = false; this.load(); });
  }

  delete(id: string) {
    if (confirm('Delete this staff member?')) {
      this.api.deleteStaff(id).subscribe(() => this.load());
    }
  }
}
