import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, timer} from "rxjs";
import { StrategyData } from './strategy-data.model';
import { MatDialog } from '@angular/material/dialog';
import { StrategyEditDialogComponent } from './strategy-edit-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { BotState } from 'src/app/store';
import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/store';
import { delay, filter, take } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-strategy-detail-list',
  templateUrl: './strategy-data-list.component.html',
  styles: []
})
export class StrategyDetailListComponent implements  OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  strategies$: Observable<StrategyData[]> = this.store.select(fromStore.BotSelectors.getStrategies);
  loading$: Observable<boolean> = this.store.select(fromStore.BotSelectors.getStrategiesLoading
    ).pipe(delay(50));

  dataSource: MatTableDataSource<StrategyData>;
  displayedColumns: string[] = [
    'name',
    'buyCondition',
    'sellCondition',
    'buyCloseCondition',
    'sellCloseCondition',
    'edit',
    'delete'
  ];

  constructor(
    public dialog: MatDialog,
    public store: Store<BotState>,

  ) { }

  ngOnInit() {
    this.store.dispatch(fromStore.BotActions.loadStrategies());

    this.strategies$.pipe(
      filter((strategies) => !!strategies && strategies.length > 0),
      //take(1)
    ).subscribe((strategies) => {
      this.dataSource = new MatTableDataSource(strategies);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(strategyData: StrategyData) {
    const dialogRef = this.dialog.open(StrategyEditDialogComponent, {
      width: '600px',
      data: strategyData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      var animal = result;
    });
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.store.dispatch(fromStore.BotActions.deleteStrategy({ id }));
      this.store.dispatch(fromStore.BotActions.loadStrategies());
    }
  }

}
