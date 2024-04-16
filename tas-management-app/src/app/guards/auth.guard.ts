import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenManagenmentService } from '@services/token-managenment.service';

export const authGuard: CanActivateFn = () => {
  const token: string | unknown = inject(TokenManagenmentService).getToken();
  if (!token) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};