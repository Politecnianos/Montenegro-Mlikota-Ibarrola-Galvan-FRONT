import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if(token == undefined){
    router.navigateByUrl('/login');
    alert("Para ver el contenido debe iniciar sesión")
  }
  return true;
};
