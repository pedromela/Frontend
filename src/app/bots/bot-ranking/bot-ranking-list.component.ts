import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, timer} from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { BotRanking } from './bot-ranking.model';
import { BotEditSubscriptionDialogComponent } from '../bot-detail-list/bot-edit-subscription-dialog.component';
import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/store';
import { delay, filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BotDetail } from '../bot-detail-list/bot-detail.model';

@Component({
  selector: 'app-bot-ranking-list',
  templateUrl: './bot-ranking-list.component.html',
  styles: []
})
export class BotRankingListComponent implements OnInit   {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  botRanking$: Observable<BotRanking[]> = this.store.select(fromStore.BotSelectors.getBotRanking);
  loading$: Observable<boolean> = this.store.select(fromStore.BotSelectors.getLoading).pipe(delay(50));
  bots$: Observable<BotDetail[]> = this.store.select(fromStore.BotSelectors.getUserBots);
  virtualBots$: Observable<BotDetail[]> = this.store.select(fromStore.BotSelectors.getUserVirtualBots);

  dataSource: MatTableDataSource<BotRanking>;
  displayedColumns: string[] = [
    'rank',
    'name',
    'market',
    'broker',
    'brokerType',
    'timeFrame',
    'effectiveWinRate',
    'winRate',
    'amountGained',
    'maxDrawBack',
    'subscribe'
  ];

  constructor(
    public dialog: MatDialog,
    public store: Store<fromStore.BotState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(fromStore.BotActions.loadRanking());
    this.store.dispatch(fromStore.BotActions.loadUserBots());
    this.store.dispatch(fromStore.BotActions.loadUserVirtualBots());

    this.botRanking$.pipe(
      filter((botRanking) => !!botRanking && botRanking.length > 0),
      //take(1)
    ).subscribe((botRanking) => {
      this.dataSource = new MatTableDataSource(botRanking);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChoose(botRanking: BotRanking) {
    const dialogRef = this.dialog.open(BotEditSubscriptionDialogComponent, {
      width: '600px',
      data: botRanking.botParameters
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.store.dispatch(fromStore.BotActions.loadUserBots());
      this.store.dispatch(fromStore.BotActions.loadUserVirtualBots());
    });
  }

  isBotUsed(botRanking: BotRanking): Observable<boolean> {
    return this.bots$
    .pipe(
      withLatestFrom(this.virtualBots$),
      switchMap(([bots, virtualBots]) => {
        const isBotUsed = (!!bots && !!bots.find((bot) => bot.id === botRanking.botParameters.id)) || 
                          (!!virtualBots && !!virtualBots.find((bot) => bot.id === botRanking.botParameters.id));
        if (isBotUsed) {
          return of(true);
        }
        return of(false);
      })
    );
  }

}
