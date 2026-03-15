import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar" [class.collapsed]="layout.isCollapsed$ | async">
      <a routerLink="/dashboard" class="sidebar-logo">
        <div class="logo-icon">🏢</div>
        <div class="logo-text">OMS<span>Portal</span></div>
      </a>

      <nav class="sidebar-nav">
        <div class="nav-section-title">Main</div>
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">📊</span><span>Dashboard</span>
        </a>
        <a routerLink="/projects" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">📁</span><span>Projects</span>
        </a>
        <a routerLink="/teams" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">🤝</span><span>Teams</span>
        </a>

        <div class="nav-section-title">HR & Admin</div>
        <a routerLink="/staff" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">👥</span><span>Staff Directory</span>
        </a>
        <a routerLink="/employees" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">🗂️</span><span>Employee Records</span>
        </a>
        <a routerLink="/attendance" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">🕐</span><span>Attendance</span>
        </a>
        
        <div class="nav-section-title">Productivity</div>
        <a routerLink="/leaves" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">📅</span><span>Leaves</span>
        </a>
        <a routerLink="/tasks" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">✅</span><span>Tasks</span>
        </a>
        <a routerLink="/documents" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">📄</span><span>Documents</span>
        </a>

        <div class="nav-section-title">Company</div>
        <a routerLink="/articles" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">📢</span><span>Announcements</span>
        </a>
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="user-avatar">{{ initial }}</div>
          <div class="user-info">
            <div class="user-name">{{ user?.name }}</div>
            <div class="user-role">{{ user?.role }}</div>
          </div>
          <button class="btn-logout" (click)="logout()" title="Logout">⇠</button>
        </div>
      </div>
    </div>
  `
})
export class SidebarComponent {
  get user() { return this.auth.currentUserValue; }
  get initial() { return this.user?.name?.[0]?.toUpperCase() ?? 'U'; }

  constructor(private auth: AuthService, public layout: LayoutService) {}

  logout() { this.auth.logout(); }
}