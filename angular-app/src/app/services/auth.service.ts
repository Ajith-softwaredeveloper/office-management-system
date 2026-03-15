import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = isDevMode() ? 'http://localhost:5000/api/auth' : '/api/auth';
  private userSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('oms_user');
    if (user) this.userSubject.next(JSON.parse(user));
  }

  get token() { return localStorage.getItem('oms_token'); }
  get currentUserValue() { return this.userSubject.value; }
  get isAdmin() { return this.currentUserValue?.role === 'Admin'; }
  get isManager() { return this.currentUserValue?.role === 'Manager' || this.isAdmin; }

  register(data: any) { return this.http.post(`${this.apiUrl}/register`, data); }

  login(creds: any) {
    return this.http.post(`${this.apiUrl}/login`, creds).pipe(
      tap((res: any) => {
        localStorage.setItem('oms_token', res.token);
        localStorage.setItem('oms_user', JSON.stringify(res.user));
        this.userSubject.next(res.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('oms_token');
    localStorage.removeItem('oms_user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}