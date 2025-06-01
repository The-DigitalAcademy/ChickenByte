import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const userData = localStorage.getItem('currentUser');
  
  if (userData) {

    return true;
  } else {
    alert('Please register first to proceed to checkout');
    router.navigate(['/register']);
    return false;
  }

  
};