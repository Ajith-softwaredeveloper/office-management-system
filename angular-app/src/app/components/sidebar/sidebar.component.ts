import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-brand">
          <mat-icon>business</mat-icon>
          <span>OMS Portal</span>
        </div>
      </div>
      <div class="sidebar-nav">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
          <mat-icon>dashboard</mat-icon> Dashboard
        </a>
        <a *ngIf="isAdmin" routerLink="/employees" routerLinkActive="active" class="nav-item">
          <mat-icon>people</mat-icon> Employees
        </a>
        <a routerLink="/attendance" routerLinkActive="active" class="nav-item">
          <mat-icon>access_time</mat-icon> Attendance
        </a>
        <a routerLink="/tasks" routerLinkActive="active" class="nav-item">
          <mat-icon>assignment</mat-icon> Tasks
        </a>
        <a routerLink="/leaves" routerLinkActive="active" class="nav-item">
          <mat-icon>event_note</mat-icon> Leaves
        </a>
      </div>
    </div>
  `
})
export class SidebarComponent {
  get isAdmin() { return this.authService.isAdmin; }
  constructor(public authService: AuthService) {}
}