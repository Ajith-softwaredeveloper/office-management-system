import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Projects</div>
        <div class="page-sub">Manage and track company projects</div>
      </div>
      <button class="btn btn-primary">+ Create Project</button>
    </div>

    <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr);">
      <div class="stat-card">
        <div class="stat-icon-wrap" style="background:#EEF2FF;color:#6366F1">📁</div>
        <div class="stat-body">
          <div class="stat-label">Active Projects</div>
          <div class="stat-value">12</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap" style="background:#ECFDF5;color:#10B981">✅</div>
        <div class="stat-body">
          <div class="stat-label">Completed</div>
          <div class="stat-value">45</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap" style="background:#FFFBEB;color:#F59E0B">⏳</div>
        <div class="stat-body">
          <div class="stat-label">In Pipeline</div>
          <div class="stat-value">8</div>
        </div>
      </div>
    </div>

    <div class="grid-2" style="grid-template-columns: 2fr 1fr;">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Recent Projects</div>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="fw-600">OMS Portal Redesign</div>
                <div class="text-muted text-sm">UI/UX improvements and animations</div>
              </td>
              <td><span class="badge badge-blue">In Progress</span></td>
              <td>Dec 20, 2024</td>
              <td>
                <div style="width: 100%; height: 6px; background: var(--surface-3); border-radius: 3px; overflow: hidden;">
                  <div style="width: 75%; height: 100%; background: var(--primary);"></div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="fw-600">Mobile App Integration</div>
                <div class="text-muted text-sm">API development for mobile clients</div>
              </td>
              <td><span class="badge badge-yellow">Pending</span></td>
              <td>Jan 15, 2025</td>
              <td>
                <div style="width: 100%; height: 6px; background: var(--surface-3); border-radius: 3px; overflow: hidden;">
                  <div style="width: 10%; height: 100%; background: var(--warning);"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">Project Members</div>
        </div>
        <div class="card-body">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="avatar" style="background: var(--primary);">A</div>
              <div>
                <div class="fw-600">Ajith</div>
                <div class="text-muted text-sm">Project Lead</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="avatar" style="background: var(--secondary);">S</div>
              <div>
                <div class="fw-600">Sarah</div>
                <div class="text-muted text-sm">Frontend Dev</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProjectsComponent {}
