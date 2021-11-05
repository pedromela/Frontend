import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MegaLadon';

  constructor(public store: Store<fromStore.BotState>,) {}

  ngOnInit() {
    //this.store.dispatch(fromStore.BotActions.loadUserDetails());
  }

  ngOnDestroy() {
    //this.store.dispatch(fromStore.BotActions.clear());
    //this.store.dispatch(fromStore.BotActions.clearCurrentBot());
  }
}
