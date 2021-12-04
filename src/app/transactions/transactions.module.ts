import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActiveTransactionListComponent } from './transaction-detail-list/active-transactions.component';
import { TradeHistoryComponent } from './transaction-detail-list/trade-history.component';


@NgModule({
    declarations: [
        TradeHistoryComponent,
        ActiveTransactionListComponent
      ],
      exports: [
        TradeHistoryComponent,
        ActiveTransactionListComponent
      ],
      imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        SharedModule,
      ],
      providers: []
})
export class TransactionsModule { }