import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="topbar">
      <div class="topbar-left">
        <div class="topbar-title">{{ title }}</div>
        <div class="topbar-breadcrumb">Office Management System</div>
      </div>
      <div class="topbar-right">
        <div style="display:flex;align-items:center;gap:8px;background:var(--surface-2);border:1px solid var(--border);border-radius:8px;padding:8px 14px;font-size:14px;color:var(--gray-700)">
          <span>👤</span> {{ (authService.currentUser$ | async)?.name }} ({{ (authService.currentUser$ | async)?.role }})
        </div>
      </div>
    </div>
  `
})
export class NavbarComponent {
  @Input() title = 'Dashboard';
  constructor(public authService: AuthService) {}
}