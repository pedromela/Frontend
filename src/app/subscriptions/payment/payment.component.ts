import { Component } from "@angular/core";
import { WalletPaymentDialogComponent } from "./payment-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import * as fromStore from 'src/app/store'
import { UserDetail } from "src/app/user/user-details.model";
import { Observable } from "rxjs";
@Component({
  selector: "app-wallet-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class WalletPaymentComponent {
  userDetails$: Observable<UserDetail> = this.store.select(fromStore.BotSelectors.getUserDetail);
  
  constructor(
    public dialog: MatDialog,
    public store: Store<fromStore.BotState>,

  ) {}

  onPay(type: number) {
    const dialogRef = this.dialog.open(WalletPaymentDialogComponent, {
      width: '800px',
      data: type
    });

    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(fromStore.BotActions.loadUserDetails());
      console.log('The dialog was closed');
    });
  }
}
