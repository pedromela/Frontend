import { ContractService } from "src/app/services/contract.service";
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PaymentService } from "src/app/services/payment.service";
import { TradingViewChartService } from "src/app/services/tradingviewchart.service";

@Component({
  templateUrl: "./payment-dialog.component.html",
  styleUrls: ["./payment-dialog.component.scss"],
})
export class WalletPaymentDialogComponent {
  direction: string;
  balance: string;

  constructor(
    private paymentService: PaymentService,
    private contract: ContractService,
    private contractService: ContractService,
    private candleService: TradingViewChartService,
    public dialogRef: MatDialogRef<WalletPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public type: number
  ) { }

  ngOnInit() {
    console.log(this.type);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(bot: any) {
    this.dialogRef.close();
  }

  connectAccount() {
    this.contract
      .connectAccount()
      .then((value: any) => {
        if(!!value) {
          this.direction = value[0];
          this.getDetails(this.direction);
        }
      })
      .catch((error: any) => {
        this.contract.failure(
          "Could't get the account data, please check if metamask is running correctly and refresh the page"
        );
      });
  }

  getDetails(account) {
    this.contract
      .accountInfo(account)
      .then((value: any) => {
        this.balance = value;
      })
      .catch((error: any) => {
        this.contract.failure(
          "Could't get the account data, please check if metamask is running correctly and refresh the page"
        );
      });
  }

  payment(type: number) {
    const address = "0x17760f404194a78e730160a5ef1Ef3f4Fb95f1FA";
    let amount = 0;
    let subpackage = '';
    this.candleService.getLastCandle("ETHUSD", "M1").subscribe((lastCandle) => {
      const ethPrice = !!lastCandle ? lastCandle.close : 4000;
      switch(type) {
        case 1:
          amount = (10 * 12) / ethPrice;
          subpackage = 'Basic';
          break;
        case 2:
          amount = (20 * 12) / ethPrice;
          subpackage = 'Advanced';
          break;
        case 3:
          amount = (50 * 12) / ethPrice;
          subpackage = 'Maximum';
          break;
        default:
          amount = (50 * 12) / ethPrice;
          subpackage = 'Maximum';
          break;
  
      }
      this.contractService
        .trasnferEther(this.direction, address, amount)
        .then((r: any) => {
          console.log(r);
          if(!!r) {
            this.contractService.success();
            this.paymentService.paymentSuccess({
              txHash: r.status.transactionHash,
              clientAddress: this.direction,
              receiverAddress: address,
              amount: amount,
              package: subpackage
            }).subscribe((e) => {
              console.log(e);
            });
          }
          this.dialogRef.close();
        })
        .catch((e) => {
          console.log(e);
          this.contractService.failure("Transaction failed");
        });
    });
  }
}
