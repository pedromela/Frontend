import { NgModule } from '@angular/core';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { MaterialModule } from '../material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { SubscriptionsComponent } from './subscriptions.component';
import { WalletAccountComponent } from './account/account.component';
import { WalletTransactionComponent } from './transaction/transaction.component';
import { WalletPaymentComponent } from './payment/payment.component';
import { WalletPaymentDialogComponent } from './payment/payment-dialog.component';

@NgModule({
  declarations: [
    SubscriptionsComponent,
    WalletAccountComponent,
    WalletTransactionComponent,
    WalletPaymentComponent,
    WalletPaymentDialogComponent
  ],
  imports: [
    SubscriptionsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule
  ],
  providers: []
})
export class SubscriptionsModule { }
