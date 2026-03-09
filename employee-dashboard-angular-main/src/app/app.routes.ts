import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/:id', component: EmployeeDetailComponent },
  { 
    path: 'add', 
    loadComponent: () => import('./components/add-edit-employee/add-edit-employee').then(m => m.AddEditEmployeeComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'edit/:id', 
    loadComponent: () => import('./components/add-edit-employee/add-edit-employee').then(m => m.AddEditEmployeeComponent),
    canActivate: [authGuard]
  }
];
