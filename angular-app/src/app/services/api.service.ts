import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = isDevMode() ? 'http://localhost:5000/api' : '/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private get opts() {
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.auth.token}` }) };
  }

  // Employees
  getEmployees() { return this.http.get(`${this.base}/employees`, this.opts); }
  createEmployee(d: any) { return this.http.post(`${this.base}/employees`, d, this.opts); }
  updateEmployee(id: string, d: any) { return this.http.put(`${this.base}/employees/${id}`, d, this.opts); }
  deleteEmployee(id: string) { return this.http.delete(`${this.base}/employees/${id}`, this.opts); }

  // Attendance
  getAttendance() { return this.http.get(`${this.base}/attendance`, this.opts); }
  markAttendance(d: any) { return this.http.post(`${this.base}/attendance`, d, this.opts); }
  deleteAttendance(id: string) { return this.http.delete(`${this.base}/attendance/${id}`, this.opts); }

  // Tasks
  getTasks() { return this.http.get(`${this.base}/tasks`, this.opts); }
  createTask(d: any) { return this.http.post(`${this.base}/tasks`, d, this.opts); }
  updateTask(id: string, d: any) { return this.http.put(`${this.base}/tasks/${id}`, d, this.opts); }
  deleteTask(id: string) { return this.http.delete(`${this.base}/tasks/${id}`, this.opts); }

  // Leaves
  getLeaves() { return this.http.get(`${this.base}/leaves`, this.opts); }
  applyLeave(d: any) { return this.http.post(`${this.base}/leaves`, d, this.opts); }
  updateLeave(id: string, d: any) { return this.http.put(`${this.base}/leaves/${id}`, d, this.opts); }
  deleteLeave(id: string) { return this.http.delete(`${this.base}/leaves/${id}`, this.opts); }

  // Staffs
  getStaffs() { return this.http.get(`${this.base}/staffs`, this.opts); }
  createStaff(d: any) { return this.http.post(`${this.base}/staffs`, d, this.opts); }
  updateStaff(id: string, d: any) { return this.http.put(`${this.base}/staffs/${id}`, d, this.opts); }
  deleteStaff(id: string) { return this.http.delete(`${this.base}/staffs/${id}`, this.opts); }

  // Leave Calculations
  getLeaveCalculations(staffId?: string) {
    const url = staffId ? `${this.base}/leave_calculations?staff_id=${staffId}` : `${this.base}/leave_calculations`;
    return this.http.get(url, this.opts);
  }
  createLeaveCalculation(d: any) { return this.http.post(`${this.base}/leave_calculations`, d, this.opts); }
  updateLeaveCalculation(id: string, d: any) { return this.http.put(`${this.base}/leave_calculations/${id}`, d, this.opts); }

  // Company Articles
  getArticles() { return this.http.get(`${this.base}/company_articles`, this.opts); }
  createArticle(d: any) { return this.http.post(`${this.base}/company_articles`, d, this.opts); }
  updateArticle(id: string, d: any) { return this.http.put(`${this.base}/company_articles/${id}`, d, this.opts); }
  deleteArticle(id: string) { return this.http.delete(`${this.base}/company_articles/${id}`, this.opts); }

  // Users
  getUsers() { return this.http.get(`${this.base}/auth/users`, this.opts); }
}