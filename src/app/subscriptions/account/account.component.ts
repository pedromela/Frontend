import { ContractService } from "src/app/services/contract.service";
import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Identicon } from "../../services/identicon";
import { Md5 } from "ts-md5/dist/md5";

@Component({
  selector: "app-wallet-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class WalletAccountComponent {
  direction: string;
  balance: string;
  profile;
  url;
  data;

  constructor(
    private contract: ContractService,
    private sanitizer: DomSanitizer,
  ) {
    this.contract
      .connectAccount()
      .then((value: any) => {
        this.direction = value[0];
        this.getDetails(this.direction);
        this.getImage(this.direction);
      })
      .catch((error: any) => {
        this.contract.failure(
          "Could't get the account data, please check if metamask is running correctly and refresh the page"
        );
      });
  }

  getImage(account) {
    this.data = this.sanitizer.bypassSecurityTrustResourceUrl(
      "data:image/svg+xml; utf8," +
      encodeURI(
        new Identicon(Md5.hashStr(account), {
          size: 32,
          format: "svg",
        }).toString(true)
      )
    );
  }

  navigateTo() {
    window.open("https://metamask.io/");
  }

  connectAccount() {
    this.contract
      .connectAccount()
      .then((value: any) => {
        this.direction = value;
        this.getDetails(this.direction);
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
}
