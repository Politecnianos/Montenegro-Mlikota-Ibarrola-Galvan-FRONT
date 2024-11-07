import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  
  console.log('Interceptor llamado');

  if (req.url.includes('/login') || req.url.includes('/registro')) {
    return next(req); 
  }

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          router.navigateByUrl('/login', { replaceUrl: true });
        } else {
          console.error('Error inesperado en el interceptor:', error);
        }

        return throwError(() => new Error(error.message));
      })
    );
  } else {
    router.navigateByUrl('/login', { replaceUrl: true });
    return throwError(() => new Error('No token found'));
  }

  return next(req);
};
