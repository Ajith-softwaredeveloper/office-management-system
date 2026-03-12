import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-attendance',
  template: `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h2 class="page-title" style="margin: 0">Attendance Log</h2>
      <button mat-flat-button color="primary" (click)="markPresent()">Mark Attendance Today</button>
    </div>

    <div class="table-container">
      <table mat-table [dataSource]="records">
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef> Date </th>
          <td mat-cell *matCellDef="let element"> {{ element.date | date:'mediumDate' }} </td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Employee </th>
          <td mat-cell *matCellDef="let element" style="font-weight: 500"> {{ element.employeeId?.name || 'Unknown' }} </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef> Status </th>
          <td mat-cell *matCellDef="let element">
            <span style="background: #E1F8F0; color: #10B981; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
              {{ element.status }}
            </span>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="['date', 'name', 'status']"></tr>
        <tr mat-row *matRowDef="let row; columns: ['date', 'name', 'status'];"></tr>
      </table>
    </div>
  `
})
export class AttendanceComponent implements OnInit {
  records: any[] = [];
  constructor(private api: ApiService, private auth: AuthService) {}
  
  ngOnInit() { this.load(); }
  
  load() {
    this.api.getAttendance().subscribe((res: any) => this.records = res);
  }

  markPresent() {
    this.api.markAttendance({
      employeeId: this.auth.currentUserValue.id,
      status: 'Present'
    }).subscribe(() => {
      alert('Attendance Marked!');
      this.load();
    });
  }
}