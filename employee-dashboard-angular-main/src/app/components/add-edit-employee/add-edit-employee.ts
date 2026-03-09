import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './add-edit-employee.html',
  styleUrls: ['./add-edit-employee.css']
})
export class AddEditEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId!: number;
  departments = ['Engineering', 'Product', 'HR', 'Finance', 'Marketing'];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      role: ['', [Validators.required]],
      department: ['', [Validators.required]],
      salary: ['', [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.employeeId = +params['id'];
        this.loadEmployeeData();
      }
    });
  }

  loadEmployeeData() {
    this.employeeService.getEmployee(this.employeeId).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue({
          name: employee.name,
          role: employee.role,
          department: employee.department,
          salary: employee.salary,
          email: employee.name.toLowerCase().replace(' ', '.') + '@company.com' // Mock email since it wasn't in original model
        });
      },
      error: (err) => {
        console.error('Error loading employee', err);
        this.router.navigate(['/employees']);
      }
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.isEditMode) {
        this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value).subscribe({
          next: () => this.router.navigate(['/employees']),
          error: (err) => console.error('Error updating', err)
        });
      } else {
        this.employeeService.addEmployee(this.employeeForm.value).subscribe({
          next: () => this.router.navigate(['/employees']),
          error: (err) => console.error('Error adding', err)
        });
      }
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }
}
