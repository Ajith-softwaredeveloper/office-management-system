import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="topbar">
      <div></div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <span style="font-weight: 500; color: var(--text-muted)">
          Ready, {{ (authService.currentUser$ | async)?.name }}
        </span>
        <button mat-icon-button (click)="logout()" color="warn">
          <mat-icon>logout</mat-icon>
        </button>
      </div>
    </div>
  `
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
  logout() { this.authService.logout(); }
}