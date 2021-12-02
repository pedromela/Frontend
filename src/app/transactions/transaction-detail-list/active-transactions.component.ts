import { TransactionDetail } from './transaction-detail.model';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { combineLatest, Observable } from 'rxjs';
import { BotState } from 'src/app/store';
import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/store';
import { delay, distinctUntilChanged, filter, map, take } from 'rxjs/operators';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-active-transactions',
  templateUrl: './active-transactions.component.html',
  styles: []
})
export class ActiveTransactionListComponent implements  OnInit, AfterViewInit, OnDestroy {
  reload$: Observable<boolean> = this.store.select(fromStore.BotSelectors.getCurrentBotReloadActiveTrades).pipe(delay(50));

  loading$: Observable<boolean> = this.store.select(fromStore.BotSelectors.getCurrentBotActiveTradesLoading).pipe(delay(50));
  transactions$: Observable<TransactionDetail[]> = this.store.select(fromStore.BotSelectors.getCurrentBotActiveTrades);
  currentBotId$: Observable<string> = this.store.select(fromStore.BotSelectors.getCurrentBotId);

  data: Params;
  symbol1: string;
  symbol2: string;

  displayedColumns: string[] = ['amount', 'amount2', 'type', 'price', 'date'];
  dataSource : MatTableDataSource<TransactionDetail>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _subs = new SubSink();

  constructor(
    private route: ActivatedRoute,
    public store: Store<BotState>,
  ) { }

  ngOnInit() {
    this._subs.add(combineLatest([
      this.store.select(fromStore.BotSelectors.getCurrentBot),
      this.store.select(fromStore.BotSelectors.getCurrentBotFrom),
      this.store.select(fromStore.BotSelectors.getCurrentBotTo),
      this.store.select(fromStore.BotSelectors.getCurrentBotReloadActiveTrades),
    ])
    .pipe(
      distinctUntilChanged(),
      filter(([botParameters, from, to, reload]) => {
        return (!!botParameters && !!from && !!to) || reload;
      }),
    )
    .subscribe(([, from, to]) => {
      this.store.dispatch(fromStore.BotActions.loadCurrentBotActiveTrades({ from, to }));
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
      this.dataSource = new MatTableDataSource<TransactionDetail>(transactions);
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

  colorCondition(pd) {
    return 'table-info';
  }
}
