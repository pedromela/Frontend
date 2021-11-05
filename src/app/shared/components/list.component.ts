import { Directive, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BotDetailService } from 'src/app/services/bot-detail.service';
import { Store } from '@ngrx/store';
import { BotState } from 'src/app/store';
import * as fromStore from 'src/app/store';
@Directive()
export class ListComponent implements  OnInit   {

  constructor(
    public dialog: MatDialog,
    public service: BotDetailService,
    public store: Store<BotState>,
  ) { 

  }

  ngOnInit() {
    this.store.dispatch(fromStore.BotActions.loadUserBots());
    this.store.dispatch(fromStore.BotActions.loadUserVirtualBots());
  }

}
