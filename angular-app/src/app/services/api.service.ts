import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = isDevMode() ? 'http://localhost:5000/api' : '/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private get headers() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.token}`
      })
    };
  }

  // Employees
  getEmployees() { return this.http.get(`${this.baseUrl}/employees`, this.headers); }
  createEmployee(data: any) { return this.http.post(`${this.baseUrl}/employees`, data, this.headers); }
  deleteEmployee(id: string) { return this.http.delete(`${this.baseUrl}/employees/${id}`, this.headers); }

  // Tasks
  getTasks() { return this.http.get(`${this.baseUrl}/tasks`, this.headers); }
  createTask(data: any) { return this.http.post(`${this.baseUrl}/tasks`, data, this.headers); }

  // Attendance
  getAttendance() { return this.http.get(`${this.baseUrl}/attendance`, this.headers); }
  markAttendance(data: any) { return this.http.post(`${this.baseUrl}/attendance`, data, this.headers); }

  // Leaves
  getLeaves() { return this.http.get(`${this.baseUrl}/leaves`, this.headers); }
  applyLeave(data: any) { return this.http.post(`${this.baseUrl}/leaves`, data, this.headers); }
  updateLeave(id: string, data: any) { return this.http.put(`${this.baseUrl}/leaves/${id}`, data, this.headers); }
}