import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = '/employees.json'; // Simulating API with local JSON
  
  // Using BehaviorSubject to act as a local in-memory store for CRUD operations
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  public employees$ = this.employeesSubject.asObservable();

  private isLoaded = false;

  constructor(private http: HttpClient) {}

  // Fetch all employees (simulating GET)
  getEmployees(): Observable<Employee[]> {
    if (this.isLoaded) {
      return this.employees$;
    }
    
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      tap(employees => {
        this.employeesSubject.next(employees);
        this.isLoaded = true;
      }),
      catchError(this.handleError)
    );
  }

  // Fetch a single employee by ID
  getEmployee(id: number): Observable<Employee> {
    return this.getEmployees().pipe(
      map(employees => {
        const emp = employees.find(e => e.id === id);
        if (!emp) {
          throw new Error('Employee not found');
        }
        return emp;
      })
    );
  }

  // Add a new employee (simulating POST)
  addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    const currentList = this.employeesSubject.value;
    // Generate simple sequential ID
    const newId = currentList.length > 0 ? Math.max(...currentList.map(e => e.id)) + 1 : 1;
    
    const newEmployee: Employee = {
      ...employee,
      id: newId
    };

    const updatedList = [...currentList, newEmployee];
    this.employeesSubject.next(updatedList);
    
    return of(newEmployee);
  }

  // Update an existing employee (simulating PUT)
  updateEmployee(id: number, employeeData: Omit<Employee, 'id'>): Observable<Employee> {
    const currentList = this.employeesSubject.value;
    const index = currentList.findIndex(e => e.id === id);
    
    if (index === -1) {
      return throwError(() => new Error('Employee not found'));
    }

    const updatedEmployee = { ...employeeData, id };
    const updatedList = [...currentList];
    updatedList[index] = updatedEmployee;
    
    this.employeesSubject.next(updatedList);
    return of(updatedEmployee);
  }

  // Delete an employee (simulating DELETE)
  deleteEmployee(id: number): Observable<boolean> {
    const currentList = this.employeesSubject.value;
    const updatedList = currentList.filter(e => e.id !== id);
    this.employeesSubject.next(updatedList);
    return of(true);
  }

  private handleError(error: any) {
    console.error('An error occurred in EmployeeService', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
