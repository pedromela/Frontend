import { AfterContentInit, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserDetail } from 'src/app/user/user-details.model';
import * as fromStore from 'src/app/store';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements AfterContentInit, CanActivate {
  userDetails$ = this.store.select(fromStore.BotSelectors.getUserDetail);

  constructor(
    private router: Router,
    public store: Store<fromStore.BotState>,
  ) {
  }

  ngAfterContentInit() {
    
  }

  isAdmin(userDetails: UserDetail) {
    if(userDetails == undefined) {
      return false;
    }

    return userDetails.userName == 'admin'
  }

  canActivate(): Observable<boolean> {
    return this.userDetails$.pipe(
      map((userDetails) => {
        if (localStorage.getItem('token') != null && this.isAdmin(userDetails)) {
          return true;
        }
        else {
          this.router.navigate(['/user/login']);
          return false;
        } 
      }),
      catchError((error) => of(false))
    );

  }
}
