import { Component, Input, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="topbar">
      <div class="topbar-left">
        <div class="topbar-title">{{ title }}</div>
        <div class="topbar-breadcrumb">Office Management System</div>
      </div>
      <div class="topbar-right">

        <!-- User chip -->
        <div style="display:flex;align-items:center;gap:8px;background:var(--surface-3);border:1.5px solid var(--border);border-radius:10px;padding:7px 14px;font-size:13px;color:var(--text-2);font-weight:500">
          <div style="width:24px;height:24px;border-radius:7px;background:linear-gradient(135deg,var(--primary),var(--secondary));display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:white">
            {{ userInitial }}
          </div>
          {{ (authService.currentUser$ | async)?.name }}
          <span style="background:var(--primary-light);color:var(--primary);font-size:10px;font-weight:700;padding:2px 7px;border-radius:10px">
            {{ (authService.currentUser$ | async)?.role }}
          </span>
        </div>

        <!-- Theme toggle -->
        <button class="theme-btn" (click)="togglePanel($event)" title="Theme Settings">🎨</button>

        <!-- Dark mode quick toggle -->
        <button class="theme-btn" (click)="toggleDark()" [title]="isDark ? 'Switch to Light' : 'Switch to Dark'">
          {{ isDark ? '☀️' : '🌙' }}
        </button>

      </div>
    </div>

    <!-- Theme settings panel -->
    <div class="theme-panel" *ngIf="panelOpen" (click)="$event.stopPropagation()">
      <div class="theme-panel-title">⚙️ Theme Settings</div>

      <div class="theme-section">
        <div class="theme-section-label">Mode</div>
        <div class="theme-mode-btns">
          <button class="theme-mode-btn" [class.active]="!isDark" (click)="setMode('light')">
            ☀️ Light
          </button>
          <button class="theme-mode-btn" [class.active]="isDark" (click)="setMode('dark')">
            🌙 Dark
          </button>
        </div>
      </div>

      <div class="theme-section">
        <div class="theme-section-label">Accent Color</div>
        <div class="theme-colors">
          <button
            class="theme-color-btn"
            *ngFor="let c of theme.colors"
            [title]="c.label"
            [style.background]="c.hex"
            [class.active]="theme.currentColor === c.id"
            (click)="setColor(c.id)">
          </button>
        </div>
      </div>

      <div class="theme-section" style="border-top:1px solid var(--border);padding-top:12px;margin-top:4px">
        <div class="theme-section-label" style="margin-bottom:6px">Preview</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <span class="badge badge-purple">Primary</span>
          <span class="badge badge-green">Success</span>
          <span class="badge badge-red">Danger</span>
          <span class="badge badge-yellow">Warning</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { position: relative; }
  `]
})
export class NavbarComponent implements OnInit {
  @Input() title = 'Dashboard';
  panelOpen = false;
  isDark = false;

  get userInitial() {
    return this.authService.currentUserValue?.name?.[0]?.toUpperCase() ?? 'U';
  }

  constructor(public authService: AuthService, public theme: ThemeService) {}

  ngOnInit() {
    this.theme.apply();
    this.isDark = this.theme.currentMode === 'dark';
  }

  togglePanel(e: Event) {
    e.stopPropagation();
    this.panelOpen = !this.panelOpen;
  }

  toggleDark() {
    this.isDark = !this.isDark;
    this.theme.setMode(this.isDark ? 'dark' : 'light');
  }

  setMode(mode: 'light' | 'dark') {
    this.isDark = mode === 'dark';
    this.theme.setMode(mode);
  }

  setColor(colorId: string) {
    this.theme.setColor(colorId as any);
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.panelOpen = false;
  }
}