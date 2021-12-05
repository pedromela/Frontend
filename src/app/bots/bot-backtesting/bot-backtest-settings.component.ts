import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromBotStore from 'src/app/store';
import * as fromStore from 'src/app/bots/bot-backtesting/store';
import { delay } from 'rxjs/operators';
import { SubscriptionPackage } from 'src/app/shared/models/subscription-package.model';
import { BotDetail } from '../bot-detail-list/bot-detail.model';

@Component({
  selector: 'app-bot-backtest-settings',
  templateUrl: './bot-backtest-settings.component.html',
  styles: ['./bot-backtest-settings.component.scss']
})
export class BotBacktestSettingsComponent implements OnInit, AfterViewInit {
  @Input() botDetail: BotDetail;
  loading$: Observable<boolean> = this.store.select(fromStore.BotBacktestSelectors.getCurrentBotSettingsLoading).pipe(delay(50));
  settingsData$: Observable<string[][]> = this.store.select(fromStore.BotBacktestSelectors.getCurrentBotSettings);
  subscriptionPackage$: Observable<SubscriptionPackage> = this.botStore.select(fromBotStore.BotSelectors.getSubscriptionPackage);

  constructor(
    public dialog: MatDialog,
    public store: Store<fromStore.BotBacktestState>,
    public botStore: Store<fromBotStore.BotState>,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(fromStore.BotBacktestActions.loadCurrentBotSettings());
  }

  ngAfterViewInit() {
  }

  colorCondition(pd) {
    return 'table-success';
  }
}
