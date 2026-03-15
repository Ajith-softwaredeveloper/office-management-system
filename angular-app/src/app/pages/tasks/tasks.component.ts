import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tasks',
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Task Board</div>
        <div class="page-sub">Assign and track tasks across your team</div>
      </div>
      <button class="btn btn-primary" (click)="openModal()" *ngIf="isAdmin">+ New Task</button>
    </div>

    <div class="stats-grid" style="grid-template-columns:repeat(3,1fr)">
      <div class="stat-card">
        <div class="stat-icon-wrap" style="background:#FFFBEB;color:#F59E0B">⏳</div>
        <div class="stat-body">
          <div class="stat-label">Pending</div>
          <div class="stat-value">{{ count('Pending') }}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap" style="background:#EFF6FF;color:#3B82F6">🔄</div>
        <div class="stat-body">
          <div class="stat-label">In Progress</div>
          <div class="stat-value">{{ count('In Progress') }}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap" style="background:#ECFDF5;color:#10B981">✅</div>
        <div class="stat-body">
          <div class="stat-label">Completed</div>
          <div class="stat-value">{{ count('Completed') }}</div>
        </div>
      </div>
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr><th>Task</th><th>Assigned To</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let t of tasks">
            <td>
              <div class="fw-600">{{ t.title }}</div>
              <div class="text-muted text-sm">{{ t.description || 'No description' }}</div>
            </td>
            <td>
              <div style="display:flex;align-items:center;gap:8px">
                <div class="avatar" style="background:#6366F1;width:28px;height:28px;font-size:12px">{{ (t.assignedTo?.name || 'U')[0] }}</div>
                <span>{{ t.assignedTo?.name || '—' }}</span>
              </div>
            </td>
            <td>
              <select class="form-select" style="width:auto;padding:4px 28px 4px 8px;font-size:13px" [(ngModel)]="t.status" (change)="updateStatus(t)">
                <option>Pending</option><option>In Progress</option><option>Completed</option>
              </select>
            </td>
            <td>
              <button class="btn btn-danger btn-icon" (click)="delete(t._id)" *ngIf="isAdmin">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="tasks.length === 0" class="empty-state">
        <div class="empty-state-icon">✅</div>
        <div class="empty-state-text">No tasks yet. Create the first task!</div>
      </div>
    </div>

    <div class="modal-overlay" *ngIf="modal" (click)="closeModal($event)">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title">Create New Task</div>
          <button class="btn-close" (click)="modal=false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Task Title *</label>
            <input class="form-input" [(ngModel)]="form.title" placeholder="E.g. Complete Q1 report">
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-input" [(ngModel)]="form.description" rows="3" placeholder="Task details..." style="resize:vertical"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Assign To</label>
              <select class="form-select" [(ngModel)]="form.assignedTo">
                <option value="">Select employee...</option>
                <option *ngFor="let u of users" [value]="u._id">{{ u.name }} ({{ u.role }})</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Status</label>
              <select class="form-select" [(ngModel)]="form.status">
                <option>Pending</option><option>In Progress</option><option>Completed</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" (click)="modal=false">Cancel</button>
          <button class="btn btn-primary" (click)="save()" [disabled]="!form.title">Create Task</button>
        </div>
      </div>
    </div>
  `
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  users: any[] = [];
  modal = false;
  form: any = { title:'', description:'', assignedTo:'', status:'Pending' };

  get isAdmin() { return this.auth.isAdmin || this.auth.isManager; }
  count(s: string) { return this.tasks.filter(t => t.status === s).length; }

  constructor(private api: ApiService, private auth: AuthService) {}
  ngOnInit() { this.load(); this.api.getUsers().subscribe((r: any) => this.users = r); }
  load() { this.api.getTasks().subscribe((r: any) => this.tasks = r); }

  openModal() { this.form = { title:'', description:'', assignedTo:'', status:'Pending' }; this.modal = true; }
  closeModal(e: any) { if (e.target === e.currentTarget) this.modal = false; }

  save() {
    this.api.createTask(this.form).subscribe(() => { this.modal = false; this.load(); });
  }

  updateStatus(t: any) {
    this.api.updateTask(t._id, { status: t.status }).subscribe();
  }

  delete(id: string) {
    if (confirm('Delete this task?')) this.api.deleteTask(id).subscribe(() => this.load());
  }
}