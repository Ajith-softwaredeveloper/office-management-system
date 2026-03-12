import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tasks',
  template: `
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
  `
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit() {
    this.api.getTasks().subscribe((res: any) => this.tasks = res);
  }
}