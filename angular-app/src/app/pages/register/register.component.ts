import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Create Account</h1>
        
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Full Name</mat-label>
            <input matInput formControlName="name">
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Email Address</mat-label>
            <input matInput formControlName="email" type="email">
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" type="password">
          </mat-form-field>

          <button mat-flat-button class="btn-primary" [disabled]="form.invalid || loading">
            {{ loading ? 'Creating...' : 'Register' }}
          </button>
        </form>

        <p style="margin-top: 1.5rem; color: var(--text-muted)">
          Already have an account? <a routerLink="/login" style="color: var(--primary); text-decoration: none; font-weight: 600">Login</a>
        </p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.register(this.form.value).subscribe({
      next: () => {
        alert('Welcome! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error?.msg || 'Registration failed');
        this.loading = false;
      }
    });
  }
}