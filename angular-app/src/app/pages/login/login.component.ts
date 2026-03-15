import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-page">
      <div class="auth-left">
        <div class="auth-left-content">
          <div class="auth-logo">
            <div class="auth-logo-icon">🏢</div>
            <div class="auth-logo-text">OMS Portal</div>
          </div>
          <h1 class="auth-headline">Manage Your<br><span>Office Smarter</span></h1>
          <p class="auth-subline">A unified platform to manage staff, attendance, leaves, tasks and company communications.</p>
          <div class="auth-features">
            <div class="auth-feature"><div class="auth-feature-dot"></div>Staff & Employee Management</div>
            <div class="auth-feature"><div class="auth-feature-dot"></div>Leave & Attendance Tracking</div>
            <div class="auth-feature"><div class="auth-feature-dot"></div>Task Assignment & Progress</div>
            <div class="auth-feature"><div class="auth-feature-dot"></div>Company Announcements</div>
          </div>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-card">
          <div class="auth-card-title">Welcome back 👋</div>
          <div class="auth-card-sub">Sign in to your account to continue</div>

          <div *ngIf="error" style="background: #FEF2F2; border: 1px solid #FCA5A5; color: #DC2626; padding: 12px 16px; border-radius: 8px; font-size: 14px; margin-bottom: 18px;">
            ⚠️ {{ error }}
          </div>

          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input class="form-input" formControlName="email" type="email" placeholder="you@company.com">
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input class="form-input" formControlName="password" type="password" placeholder="••••••••">
            </div>
            <button class="btn btn-primary btn-full" type="submit" [disabled]="form.invalid || loading" style="margin-top: 8px;">
              <span *ngIf="loading" style="display:flex;align-items:center;gap:8px">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite">
                  <circle cx="12" cy="12" r="10" stroke-opacity="0.3"/><path d="M12 2a10 10 0 0 1 10 10"/>
                </svg>
                Signing in...
              </span>
              <span *ngIf="!loading">Sign In →</span>
            </button>
          </form>
          <div class="auth-link">Don't have an account? <a routerLink="/register">Create one free</a></div>
        </div>
      </div>
    </div>
    <style>
      @keyframes spin { to { transform: rotate(360deg); } }
    </style>
  `
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    this.auth.login(this.form.value).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.error = err.error?.msg || 'Login failed. Please try again.';
        this.loading = false;
      }
    });
  }
}