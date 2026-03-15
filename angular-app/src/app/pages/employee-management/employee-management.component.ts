import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-employees',
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Employee Directory</div>
        <div class="page-sub">Manage registered employees in the system</div>
      </div>
      <button class="btn btn-primary" (click)="openModal()">+ Add Employee</button>
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Department</th><th>Position</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let e of employees">
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                <div class="avatar" [style.background]="color(e.name)">{{ e.name[0] }}</div>
                <span class="fw-600">{{ e.name }}</span>
              </div>
            </td>
            <td class="text-muted">{{ e.email }}</td>
            <td>{{ e.department || '—' }}</td>
            <td><span class="badge badge-purple">{{ e.position || 'Employee' }}</span></td>
            <td>
              <div style="display:flex;gap:6px">
                <button class="btn btn-secondary btn-icon" (click)="editEmp(e)">✏️</button>
                <button class="btn btn-danger btn-icon" (click)="deleteEmp(e._id)">🗑️</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="employees.length === 0" class="empty-state">
        <div class="empty-state-icon">🗂️</div>
        <div class="empty-state-text">No employees yet. Add your first!</div>
      </div>
    </div>

    <div class="modal-overlay" *ngIf="modal" (click)="closeModal($event)">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title">{{ editing ? 'Edit Employee' : 'Add Employee' }}</div>
          <button class="btn-close" (click)="modal=false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Name *</label>
              <input class="form-input" [(ngModel)]="form.name" placeholder="Full name">
            </div>
            <div class="form-group">
              <label class="form-label">Email *</label>
              <input class="form-input" [(ngModel)]="form.email" type="email" placeholder="email@company.com">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input class="form-input" [(ngModel)]="form.phone" placeholder="+91 ...">
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
          <div class="form-group">
            <label class="form-label">Position / Title</label>
            <input class="form-input" [(ngModel)]="form.position" placeholder="Senior Developer">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" (click)="modal=false">Cancel</button>
          <button class="btn btn-primary" (click)="save()" [disabled]="!form.name || !form.email">
            {{ editing ? 'Save Changes' : 'Add Employee' }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class EmployeeManagementComponent implements OnInit {
  employees: any[] = [];
  modal = false;
  editing: any = null;
  form: any = { name:'', email:'', phone:'', department:'', position:'' };

  color(name: string) {
    const colors = ['#6366F1','#10B981','#F59E0B','#EF4444','#3B82F6','#8B5CF6'];
    return colors[name.charCodeAt(0) % colors.length];
  }

  constructor(private api: ApiService) {}
  ngOnInit() { this.load(); }
  load() { this.api.getEmployees().subscribe((r: any) => this.employees = r); }

  openModal() { this.editing = null; this.form = { name:'', email:'', phone:'', department:'', position:'' }; this.modal = true; }
  editEmp(e: any) { this.editing = e; this.form = { ...e }; this.modal = true; }
  closeModal(ev: any) { if (ev.target === ev.currentTarget) this.modal = false; }

  save() {
    const req = this.editing
      ? this.api.updateEmployee(this.editing._id, this.form)
      : this.api.createEmployee(this.form);
    req.subscribe(() => { this.modal = false; this.load(); });
  }

  deleteEmp(id: string) {
    if (confirm('Delete this employee?')) this.api.deleteEmployee(id).subscribe(() => this.load());
  }
}