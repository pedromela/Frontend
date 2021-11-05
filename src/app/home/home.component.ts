import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  userDetails$ = this.store.select(fromStore.BotSelectors.getUserDetail);
  isAdmin$: Observable<boolean> = this.store.select(fromStore.BotSelectors.isAdmin);

  constructor(
    public router: Router,
    public store: Store<fromStore.BotState>,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(fromStore.BotActions.loadUserDetails());
  }
}
