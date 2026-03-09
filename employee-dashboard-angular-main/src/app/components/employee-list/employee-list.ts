import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { DepartmentFilterPipe } from '../../pipes/department-filter.pipe';
import { HighSalaryDirective } from '../../directives/high-salary.directive';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    DepartmentFilterPipe,
    HighSalaryDirective
  ],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['id', 'name', 'role', 'department', 'salary', 'actions'];
  filterDepartment: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => this.employees = data,
      error: (err) => console.error('Error fetching employees', err)
    });
  }

  viewDetails(id: number) {
    this.router.navigate(['/employees', id]);
  }

  editEmployee(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => console.error('Error deleting employee', err)
      });
    }
  }
}
