import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { URLS } from 'src/app/services/urls.base';
import { TransactionDetail } from '../transactions/transaction-detail-list/transaction-detail.model';
import { Observable, of } from 'rxjs';
import { genericRetryStrategy } from './genericRetryStrategy';
import { catchError, retryWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionDetailService {
  formData: TransactionDetail = {
    id :null,
    botId: null,
    buyPriceId: null,
    buyId: null,
    sellPriceId: null,
    amount: null,
    amountSymbol2: null,
    price: null,
    type: null,
    lastProfitablePrice: null,
    states: null,
    timestamp: null,
    market: null,
    active: null
  };
  
  list : TransactionDetail[];
  auxList : TransactionDetail[];

  constructor(private http: HttpClient) { 
    this.list = [];
  }

  postTransactionDetail() {
    return this.http.post(URLS.botapiURL + '/Transactions', this.formData);
  }
  putTransactionDetail() {
    return this.http.put(URLS.botapiURL + '/Transactions/'+ this.formData.id, this.formData);
  }
  deleteTransactionDetail(id) {
    return this.http.delete(URLS.botapiURL + '/Transactions/'+ id);
  }

  getTradeHistoryTransactions(botId: string, quantity: number): Observable<TransactionDetail[]> {
    const date = new Date();
    return this.http.get<TransactionDetail[]>(
        URLS.botapiURL + 
        '/Transactions/history/' + 
        quantity +'/' + 
        botId + '/' + 
        date.toUTCString()
    )
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

  getActiveTransactions(botId: string, quantity: number): Observable<TransactionDetail[]> {
    const date = new Date();
    return this.http.get<TransactionDetail[]>(URLS.botapiURL + '/Transactions/active/' + quantity + '/' + botId + '/' + date.toUTCString())
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

  getTradeHistoryTransactionsFromTo(botId: string, from: Date, to: Date): Observable<TransactionDetail[]> {
    let params = new HttpParams();
    params = params.append('botId', botId);
    params = params.append('from', from.toUTCString());
    params = params.append('to', to.toUTCString());

    return this.http.get<TransactionDetail[]>(
      URLS.botapiURL + '/Transactions/history',
      { params }
    )
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

  getActiveTransactionsFromTo(botId: string, from: Date, to: Date): Observable<TransactionDetail[]> {
    let params = new HttpParams();
    params = params.append('botId', botId);
    params = params.append('from', from.toUTCString());
    params = params.append('to', to.toUTCString());
    return this.http.get<TransactionDetail[]>(
      URLS.botapiURL + '/Transactions/active',
      { params }
    )
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

  refreshList(id): number {
    console.log("transaction-detail.component: refreshList() id is " + id);

    var response = this.http.get(URLS.botapiURL + '/Transactions/self/100/' + id);

    response
    .toPromise()
    .then(res => { //Success
      this.auxList = res as TransactionDetail[];
      this.list.push(...this.auxList);
    }, msg => { //Error
        console.log(msg);
    })

    if(this.auxList == undefined) {
      return 0;
    }

    var last = this.list[this.list.length - 1];
    if(last == undefined) {
      return 0;
    }
    return last.id;
  }


  getTradeHistoryBacktesterTransactions(botId: string, quantity: number): Observable<TransactionDetail[]> {
    const date = new Date();
    return this.http.get<TransactionDetail[]>(
        URLS.backtesterapiURL + 
        '/BacktesterTransactions/history/' + 
        quantity +'/' + 
        botId + '/' + 
        date.toUTCString()
    )
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

  getActiveBacktesterTransactions(botId: string, quantity: number): Observable<TransactionDetail[]> {
    const date = new Date();
    return this.http.get<TransactionDetail[]>(URLS.backtesterapiURL + '/BacktesterTransactions/active/' + quantity + '/' + botId + '/' + date.toUTCString())
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

  getTradeHistoryBacktesterTransactionsFromTo(botId: string, from: Date, to: Date): Observable<TransactionDetail[]> {
    let params = new HttpParams();
    params = params.append('botId', botId);
    params = params.append('from', from.toUTCString());
    params = params.append('to', to.toUTCString());

    return this.http.get<TransactionDetail[]>(
      URLS.backtesterapiURL + '/BacktesterTransactions/history',
      { params }
    )
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

  getActiveBacktesterTransactionsFromTo(botId: string, from: Date, to: Date): Observable<TransactionDetail[]> {
    let params = new HttpParams();
    params = params.append('botId', botId);
    params = params.append('from', from.toUTCString());
    params = params.append('to', to.toUTCString());
    return this.http.get<TransactionDetail[]>(
      URLS.backtesterapiURL + '/BacktesterTransactions/active',
      { params }
    )
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

}
