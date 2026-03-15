import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="auth-page">
      <div class="auth-left">
        <div class="auth-left-content">
          <div class="auth-logo">
            <div class="auth-logo-icon">🏢</div>
            <div class="auth-logo-text">OMS Portal</div>
          </div>
          <h1 class="auth-headline">Get Started<br><span>For Free</span></h1>
          <p class="auth-subline">Create your account in seconds and gain full access to your office management platform.</p>
          <div class="auth-features">
            <div class="auth-feature"><div class="auth-feature-dot"></div>No credit card required</div>
            <div class="auth-feature"><div class="auth-feature-dot"></div>Unlimited employees & staff</div>
            <div class="auth-feature"><div class="auth-feature-dot"></div>Full leave & attendance module</div>
            <div class="auth-feature"><div class="auth-feature-dot"></div>Task management included</div>
          </div>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-card">
          <div class="auth-card-title">Create Account ✨</div>
          <div class="auth-card-sub">Fill in your details to get started</div>

          <div *ngIf="error" style="background: #FEF2F2; border: 1px solid #FCA5A5; color: #DC2626; padding: 12px 16px; border-radius: 8px; font-size: 14px; margin-bottom: 18px;">
            ⚠️ {{ error }}
          </div>

          <div *ngIf="success" style="background: #ECFDF5; border: 1px solid #6EE7B7; color: #059669; padding: 12px 16px; border-radius: 8px; font-size: 14px; margin-bottom: 18px;">
            ✅ Account created! Redirecting to login...
          </div>

          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input class="form-input" formControlName="name" placeholder="John Doe">
              </div>
              <div class="form-group">
                <label class="form-label">Role</label>
                <select class="form-select" formControlName="role">
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Email Address *</label>
              <input class="form-input" formControlName="email" type="email" placeholder="you@company.com">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Phone</label>
                <input class="form-input" formControlName="phone" placeholder="+91 9876543210">
              </div>
              <div class="form-group">
                <label class="form-label">Department</label>
                <select class="form-select" formControlName="department">
                  <option value="">Select...</option>
                  <option>Engineering</option>
                  <option>Sales</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>Operations</option>
                  <option>Marketing</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Password * <span class="text-muted">(min 6 characters)</span></label>
              <input class="form-input" formControlName="password" type="password" placeholder="••••••••">
            </div>
            <button class="btn btn-primary btn-full" type="submit" [disabled]="form.invalid || loading" style="margin-top: 8px;">
              <span *ngIf="loading">Creating account...</span>
              <span *ngIf="!loading">Create My Account →</span>
            </button>
          </form>
          <div class="auth-link">Already have an account? <a routerLink="/login">Sign in</a></div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  error = '';
  success = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    if (this.auth.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Employee'],
      phone: [''],
      department: ['']
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.success = true;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.error = err.error?.msg || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }
}