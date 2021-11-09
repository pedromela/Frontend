import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BotDetail } from './bot-detail.model';
import { BotEditDialogComponent } from './bot-edit-dialog.component';
import { BotEditSubscriptionDialogComponent } from './bot-edit-subscription-dialog.component';
import { BotState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from 'src/app/store';
import { delay, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionPackage } from 'src/app/shared/models/subscription-package.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bot-settings',
  templateUrl: './bot-settings.component.html',
  styles: ['./bot-settings.component.scss']
})
export class BotSettingsComponent implements OnInit, AfterViewInit {
  @Input() botDetail: BotDetail;
  //isAdmin$: Observable<boolean> = this.store.select(fromStore.BotSelectors.isAdmin);
  loading$: Observable<boolean> = this.store.select(fromStore.BotSelectors.getCurrentBotLoading).pipe(delay(50));
  settingsData$: Observable<string[][]> = this.store.select(fromStore.BotSelectors.getCurrentBotSettings);
  subscriptionPackage$: Observable<SubscriptionPackage> = this.store.select(fromStore.BotSelectors.getSubscriptionPackage);

  constructor(
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    public store: Store<BotState>,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(fromStore.BotActions.loadCurrentBotSettings());
  }

  ngAfterViewInit() {
  }
  
  goToBotBacktesting() {
    this.subscriptionPackage$
    .pipe(take(1))
    .subscribe((subscriptionPackage) => {
      if (subscriptionPackage && subscriptionPackage.backtesting) {
        this.router.navigate(['/bots/backtest', this.botDetail.botId]);
      } else {
        this.toastr.warning('You don\'t have sufficient permissions. Please upgrade subscription.', 'Subscription');
      }
    });
  }

  openEditDialog(): void {
    this.subscriptionPackage$
    .pipe(take(1))
    .subscribe((subscriptionPackage) => {
      if (subscriptionPackage && subscriptionPackage.botCreation) {
        const dialogRef = this.dialog.open(BotEditDialogComponent, {
          width: '600px',
          data: this.botDetail
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      } else {
        this.toastr.warning('You don\'t have sufficient permissions. Please upgrade subscription.', 'Subscription');
      }
    });
  }

  openCloneDialog(): void {
    this.subscriptionPackage$
    .pipe(take(1))
    .subscribe((subscriptionPackage) => {
      if (subscriptionPackage && subscriptionPackage.botCreation) {
        const clone = {...this.botDetail};
        clone.id = null;
        clone.botId = null;
        
        const dialogRef = this.dialog.open(BotEditDialogComponent, {
          width: '600px',
          data: clone
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      } else {
        this.toastr.warning('You don\'t have sufficient permissions. Please upgrade subscription.', 'Subscription');
      }
    });
  }

  openEditSubscriptionDialog(): void {
    const dialogRef = this.dialog.open(BotEditSubscriptionDialogComponent, {
      width: '600px',
      data: this.botDetail
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  colorCondition(pd) {
    return 'table-success';
  }
}
