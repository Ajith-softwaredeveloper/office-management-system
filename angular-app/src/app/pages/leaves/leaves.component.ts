import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-leaves',
  template: `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h2 class="page-title" style="margin: 0">Leave Requests</h2>
      <button mat-flat-button color="primary" (click)="applyRandomLeave()">+ Apply Leave</button>
    </div>

    <div class="table-container">
      <table mat-table [dataSource]="leaves">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Employee </th>
          <td mat-cell *matCellDef="let element"> {{ element.employeeId?.name }} </td>
        </ng-container>

        <ng-container matColumnDef="reason">
          <th mat-header-cell *matHeaderCellDef> Reason </th>
          <td mat-cell *matCellDef="let element" style="font-weight: 500"> {{ element.reason }} </td>
        </ng-container>

        <ng-container matColumnDef="dates">
          <th mat-header-cell *matHeaderCellDef> Duration </th>
          <td mat-cell *matCellDef="let element" style="color: var(--text-muted)"> 
            {{ element.startDate | date:'shortDate' }} - {{ element.endDate | date:'shortDate' }} 
          </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef> Status </th>
          <td mat-cell *matCellDef="let element">
            <span [ngStyle]="{'background': element.status === 'Approved' ? '#E1F8F0' : '#FCE8E8', 'color': element.status === 'Approved' ? '#10B981' : '#EF4444'}" style="padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
              {{ element.status }}
            </span>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="['name', 'reason', 'dates', 'status']"></tr>
        <tr mat-row *matRowDef="let row; columns: ['name', 'reason', 'dates', 'status'];"></tr>
      </table>
      <div *ngIf="leaves.length === 0" style="padding: 40px; text-align: center; color: var(--text-muted)">
        No leave records found.
      </div>
    </div>
  `
})
export class LeavesComponent implements OnInit {
  leaves: any[] = [];
  constructor(private api: ApiService, private auth: AuthService) {}
  ngOnInit() { this.load(); }
  
  load() {
    this.api.getLeaves().subscribe((res: any) => this.leaves = res);
  }

  applyRandomLeave() {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 2);

    this.api.applyLeave({
      employeeId: this.auth.currentUserValue.id,
      reason: 'Sick Leave / Personal',
      startDate: start,
      endDate: end
    }).subscribe(() => {
      alert('Leave applied successfully!');
      this.load();
    });
  }
}