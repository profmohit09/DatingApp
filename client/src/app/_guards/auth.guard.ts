import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toaster = inject(ToastrService);

  return accountService.currentUser$.pipe(
    map(user => {
      if (user) {
        return true; // User is authenticated
      } else {
        toaster.error('Not Pass!!!!!');
        return false; // User is not authenticated
      }
    })
  );
};
