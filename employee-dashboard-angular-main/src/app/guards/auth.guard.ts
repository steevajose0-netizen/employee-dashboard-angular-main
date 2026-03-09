import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // Simulating an authenticated user.
  // In a real app, you'd check a token or auth service.
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    router.navigate(['/employees']);
    return false;
  }
  return true;
};
