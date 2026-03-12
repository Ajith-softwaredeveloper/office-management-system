import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-employees',
  template: `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h2 class="page-title" style="margin: 0">Employees Directory</h2>
      <button mat-flat-button color="primary">+ Add Employee</button>
    </div>

    <div class="table-container">
      <table mat-table [dataSource]="employees">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let element" style="font-weight: 500"> {{element.name}} </td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef> Email </th>
          <td mat-cell *matCellDef="let element" style="color: var(--text-muted)"> {{element.email}} </td>
        </ng-container>

        <ng-container matColumnDef="department">
          <th mat-header-cell *matHeaderCellDef> Department </th>
          <td mat-cell *matCellDef="let element"> {{element.department || 'N/A'}} </td>
        </ng-container>

        <ng-container matColumnDef="position">
          <th mat-header-cell *matHeaderCellDef> Position </th>
          <td mat-cell *matCellDef="let element">
            <span style="background: #EEEDFF; color: #4F46E5; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
              {{element.position || 'Employee'}}
            </span>
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let element" style="text-align: right">
            <button mat-icon-button (click)="deleteEmp(element._id)" color="warn">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="['name', 'email', 'department', 'position', 'actions']"></tr>
        <tr mat-row *matRowDef="let row; columns: ['name', 'email', 'department', 'position', 'actions'];"></tr>
      </table>
      <div *ngIf="employees.length === 0" style="padding: 40px; text-align: center; color: var(--text-muted)">
        No employees found.
      </div>
    </div>
  `
})
export class EmployeeManagementComponent implements OnInit {
  employees: any[] = [];
  constructor(private api: ApiService) {}

  ngOnInit() { this.load(); }
  
  load() {
    this.api.getEmployees().subscribe((res: any) => this.employees = res);
  }

  deleteEmp(id: string) {
    if(confirm('Are you sure?')) {
      this.api.deleteEmployee(id).subscribe(() => this.load());
    }
  }
}