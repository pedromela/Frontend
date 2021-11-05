import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as fromStore from 'src/app/store';
import { SubscriptionPackage } from '../../models/subscription-package.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  subscriptionPackage$: Observable<SubscriptionPackage> = this.store.select(fromStore.BotSelectors.getSubscriptionPackage);

  constructor(
    private toastr: ToastrService,
    public dialog: MatDialog,
    public store: Store<fromStore.BotState>
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
        const permission = next.data.permission;
        return this.subscriptionPackage$
        .pipe(
            filter((subscriptionPackage) => {
              if(!subscriptionPackage) {
                this.store.dispatch(fromStore.BotActions.loadUserDetails());
                return false;
              }
              return true;
            }),
            map((subscriptionPackage) => {
              console.log(subscriptionPackage);
              if (subscriptionPackage != null && subscriptionPackage.isAuthorized(permission))
                return true;
              else {
                this.toastr.warning('You don\'t have sufficient permissions. Please upgrade subscription.', 'Subscription');
                this.store.dispatch(fromStore.BotActions.clearCurrentBot());
                this.store.dispatch(fromStore.BotActions.clear());
                return false;
              }
            })
        );

  }
}
