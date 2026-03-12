import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="layout-wrapper" *ngIf="authService.currentUser$ | async as user; else authPages">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <app-navbar></app-navbar>
        <div class="page-container">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
    <ng-template #authPages>
      <router-outlet></router-outlet>
    </ng-template>
  `
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}