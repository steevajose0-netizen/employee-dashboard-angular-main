import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './employee-detail.html',
  styleUrls: ['./employee-detail.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: (Employee & { joiningDate?: string }) | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadEmployee(id);
      }
    });
  }

  loadEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe({
      next: (data) => this.employee = data,
      error: (err) => {
        console.error('Error fetching employee details', err);
        this.router.navigate(['/employees']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}
