import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="layout" *ngIf="(authService.currentUser$ | async) && authService.token; else authPages">
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
export class AppComponent implements OnInit {
  pageTitle = 'Dashboard';

  constructor(public authService: AuthService, private theme: ThemeService) {}

  ngOnInit() {
    // Apply saved theme on every load
    this.theme.apply();
  }
}