import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as fromStore from 'src/app/store';
import { UserDetail } from 'src/app/user/user-details.model';
import { PurchaseSubscriptionDialogComponent } from '../../components/purchase-subscription-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionGuard implements CanActivate {
  userDetails$: Observable<UserDetail> = this.store.select(fromStore.BotSelectors.getUserDetail);

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public store: Store<fromStore.BotState>
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
        return this.userDetails$
        .pipe(
            filter((userDetails) => {
              if(!userDetails) {
                this.store.dispatch(fromStore.BotActions.loadUserDetails());
                return false;
              }
              return true;
            }),
            map((userDetails) => {
              console.log(userDetails);
              if (userDetails.package != null)
                return true;
              else {
                const dialogRef = this.dialog.open(PurchaseSubscriptionDialogComponent, {
                  width: '800px',
                  data: {}
                });
            
                dialogRef.afterClosed().subscribe(result => {
                  console.log('The dialog was closed');
                });
                this.store.dispatch(fromStore.BotActions.clearCurrentBot());
                this.store.dispatch(fromStore.BotActions.clear());
                return false;
              }
            })
        );

  }
}
