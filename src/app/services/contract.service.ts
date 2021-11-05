import {Inject, Injectable} from '@angular/core';
import { WEB3 } from './web3';
import contract from 'truffle-contract';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

import Web3 from 'web3';
import Web3Modal, { IProviderOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { PaymentService } from './payment.service';
import { ToastrService } from 'ngx-toastr';

declare let require: any;
//const Web3 = require('web3');
const tokenAbi = require('src/app/contracts/build/Payment.json');
declare let window: any;

@Injectable({
  providedIn: 'root'
})

export class ContractService {
  public accountsObservable = new Subject<string[]>();
  public compatible: boolean;
  web3Modal: Web3Modal;
  web3js: Web3;
  provider;
  accounts;
  balance;

  constructor(
    private toastr: ToastrService,
    @Inject(WEB3) private web3: Web3,
    private snackbar: MatSnackBar,
    private paymentService: PaymentService
  ) {
    const providerOptions: IProviderOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "67338b8faaaf47baa3912a056e6eb82a", // required
          chainId: 1
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "mainnet",
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });
  }


  async connectAccount() {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    const chainId = this.provider.networkVersion;
    if(!chainId || chainId !== "1") {
      this.toastr.warning('You\'re not in the correct network!', 'Wallet')
      return null;
    }
    this.accounts = await this.web3js.eth.getAccounts();
    return this.accounts;
  }

  async accountInfo(account){
    const initialvalue = await this.web3js.eth.getBalance(account);
    this.balance = this.web3js.utils.fromWei(initialvalue , 'ether');
    return this.balance;
  }


  trasnferEther(originAccount: string, destinyAccount: string, amount: number) {
    return new Promise((resolve, reject) => {
      const amountToSend = this.web3js.utils.toWei(amount.toString(), 'ether');
      this.web3js.eth.sendTransaction({ from: originAccount, to: destinyAccount, value: amountToSend })
      .then((status) => {
        return resolve({status: status});
      }).catch((error) => {
        console.log(error);
        return reject('Error transfering Ether');
      });
      // const paymentContract = contract(tokenAbi);
      // paymentContract.setProvider(this.provider);
      // paymentContract.deployed().then((instance) => {
      //   let finalAmount =  this.web3.utils.toBN((amount*(10**18)).toString());
      //   //console.log(finalAmount)
      //   return instance.nuevaTransaccion(
      //     destinyAccount,
      //     {
      //       from: originAccount,
      //       value: finalAmount
      //     }
      //     );
      // }).then((status) => {
      //     return resolve({status: status});
      // }).catch((error) => {
      //   console.log(error);

      //   return reject('Error transfering Ether');
      // });
    });
  }


  failure(message: string) {
    this.toastr.error(message, 'Subscription');
  }

  success() {
    this.toastr.success('Transaction complete successfully', 'Subscription');
  }
}
