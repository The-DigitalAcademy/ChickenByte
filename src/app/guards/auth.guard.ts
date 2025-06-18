import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  
  const userData = localStorageService.getUser();
  
  if (userData) {

    return true;
  } else {
    alert('Please register first to proceed to checkout');
    router.navigate(['/register']);
    return false;
  }

  
};