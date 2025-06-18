import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

export const profileGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  const currentUser = localStorageService.getUser();

  if (currentUser) {
    return true;
  } else {
    router.navigate(['/register']);
    return false;
  }
};
