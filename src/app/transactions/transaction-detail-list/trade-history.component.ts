import { TransactionDetail } from './transaction-detail.model';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BotState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import * as fromStore from 'src/app/store';
import { delay, distinctUntilChanged, filter, take } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.css']
})
export class TradeHistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  data: Params;
  symbol1: string;
  symbol2: string;
  loading$: Observable<boolean> = this.store.select(fromStore.BotSelectors.getCurrentBotTradeHistoryLoading).pipe(delay(50));
  transactions$: Observable<TransactionDetail[]> = this.store.select(fromStore.BotSelectors.getCurrentBotHistoryTrades);
  currentBotId$: Observable<string> = this.store.select(fromStore.BotSelectors.getCurrentBotId);

  displayedColumns: string[] = ['amount', 'amount2', 'type', 'price', 'date', 'state'];
  dataSource : MatTableDataSource<TransactionDetail>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _subs = new SubSink();

  constructor(
    private route: ActivatedRoute,
    public store: Store<BotState>,
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<TransactionDetail>();

    this._subs.add(combineLatest([
      this.store.select(fromStore.BotSelectors.getCurrentBot),
      this.store.select(fromStore.BotSelectors.getCurrentBotFrom),
      this.store.select(fromStore.BotSelectors.getCurrentBotTo),
      this.store.select(fromStore.BotSelectors.getCurrentBotReloadHistoryTrades),
    ])
    .pipe(
      distinctUntilChanged(),
      filter(([botParameters, from, to, reload]) => {
        return (!!botParameters && !!from && !!to) || reload
      }),
    )
    .subscribe(([, from, to]) => {
      this.store.dispatch(fromStore.BotActions.loadCurrentBotHistoryTrades({ from, to }));
    }));
  }

  ngAfterViewInit() {
    this.data = this.route.snapshot.params;
    this.transactions$
    .pipe(
      distinctUntilChanged(),
      filter((transactions) => !!transactions && transactions.length > 0)
    )
    .subscribe((transactions) => {
      this.dataSource.data = transactions;
      this.dataSource.paginator = this.paginator;
      if(transactions.length > 0) {
        this.symbol1 = transactions[0].market.substr(0,3);
        this.symbol2 = transactions[0].market.substr(3);
      }
    });
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

  chooseType(type) {
    switch(type) {
      case 0:
        return 'Buy';
      case 1:
        return 'Buy close';
      case 2:
        return 'Buy';
      case 4:
        return 'Sell';
      case 5:
        return 'Sell close';
      case 6:
        return 'Sell';
    }
  }

  populateForm(pd: TransactionDetail) {
  }

  colorCondition(pd: TransactionDetail) {

    if(pd.type == 2 || pd.type == 6) {
      return 'table-info';
    }
    else if(pd.type == 5 || pd.type == 1) {
      if(pd.states.includes('WIN')) {
        return 'table-success';
      }
      else if(pd.states.includes('lockedremainingprofit')) {
        return 'table-warning';
      }
      else {
        return 'table-danger'
      }
    }

    return 'table-info';
  }
}
