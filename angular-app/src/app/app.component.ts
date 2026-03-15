import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="layout" *ngIf="authService.currentUser$ | async as user; else authPages">
      <app-sidebar></app-sidebar>
      <div class="main">
        <app-navbar [title]="pageTitle"></app-navbar>
        <div class="page">
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
  pageTitle = 'Dashboard';
  constructor(public authService: AuthService) {}
}