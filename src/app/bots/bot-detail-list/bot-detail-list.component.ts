import { BotDetail } from './bot-detail.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { BotEditDialogComponent } from './bot-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BotState } from 'src/app/store';
import * as fromStore from 'src/app/store';
import { delay, filter, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-bot-detail-list',
  templateUrl: './bot-detail-list.component.html',
  styles: []
})
export class BotDetailListComponent implements  OnInit, AfterViewInit {
  loading$: Observable<boolean> = this.store.select(fromStore.BotSelectors.getLoading).pipe(delay(50));
  reloadData$: Observable<boolean> = this.store.select(fromStore.BotSelectors.getReloadData).pipe(delay(50));
  bots$: Observable<BotDetail[]> = this.store.select(fromStore.BotSelectors.getUserBots);
  dataSource: MatTableDataSource<BotDetail>;
  displayedColumns: string[] = ['botName', 'market', 'broker', 'brokerType', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private _subs = new SubSink();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public store: Store<BotState>,
  ) { 
  }

  ngOnInit() {
    this.store.dispatch(fromStore.BotActions.loadUserBots());

    this._subs.add(this.bots$.pipe(
      filter((bots) => !!bots && bots.length > 0),
    ).subscribe((bots) => {
      this.dataSource = new MatTableDataSource(bots);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }));
  }

  ngAfterViewInit() {
    this._subs.add(this.reloadData$
      .pipe(
        filter((reloadData) => !!reloadData)
      )
      .subscribe(() => {
        this.store.dispatch(fromStore.BotActions.loadUserBots());
      }));
  }

  goToBotDetail(botDetail: BotDetail) {
    this.router.navigate(['/bots', botDetail.id]);
  }

  onEdit(botDetail: BotDetail) {
    const dialogRef = this.dialog.open(BotEditDialogComponent, {
      width: '800px',
      data: botDetail
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onDelete(id) {
      this.store.dispatch(fromStore.BotActions.deleteUserBotRelation({ id }));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
