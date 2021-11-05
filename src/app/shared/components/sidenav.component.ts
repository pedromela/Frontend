import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { BotActions, BotSelectors, BotState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserDetail } from 'src/app/user/user-details.model';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
})

export class SideNavComponent {
  userDetails$: Observable<UserDetail> = this.store.select(BotSelectors.getUserDetail).pipe(
    tap((userDetail) => {
      if (!userDetail) {
        this.store.dispatch(BotActions.loadUserDetails());
      }
    })
  );
  collapsedNav: boolean;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public router: Router,
    public store: Store<BotState>,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLogout() {
    localStorage.removeItem('token');
    this.store.dispatch(BotActions.clear());
    this.router.navigate(['/user/login']);
  }
}
