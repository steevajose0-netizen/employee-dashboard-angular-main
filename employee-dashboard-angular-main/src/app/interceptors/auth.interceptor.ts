import { HttpInterceptorFn, HttpHeaders } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Simulating an auth token being added to every request
  const token = 'fake-jwt-token-12345';
  const authReq = req.clone({
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  });
  
  return next(authReq);
};
