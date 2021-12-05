import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { BacktestData } from '../shared/interfaces/chartmodel';
import { URLS } from './urls.base';

@Injectable({
  providedIn: 'root'
})
export class BacktesterSignalRService {
  public data: BacktestData[];
  public dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public bradcastedData: BacktestData[];
  private hubConnection: signalR.HubConnection

  constructor(
    private http: HttpClient,
    private toastr: ToastrService

  ) { 
  }

  public startConnection(botId: string, fromDate: Date, toDate: Date): Promise<void> {
    let searchparams = new HttpParams();
    searchparams = searchparams.append('botId', botId);
    searchparams = searchparams.append('fromDate', fromDate.toISOString());
    searchparams = searchparams.append('toDate', toDate.toISOString());
    const str = searchparams.toString();

    this.startHttpRequest(botId, fromDate, toDate);

    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(URLS.backtestersignalrapiURL + '/backtester')
                            .build();

    return this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.dataSubject.next(null);
        this.addTransferChartDataListener();
        this.addBroadcastChartDataListener();
      })
      .catch(err => {
        console.log('Error while starting connection: ' + err);
      });
  }

  private startHttpRequest(botId: string, fromDate: Date, toDate: Date) {
    let searchparams = new HttpParams();
    searchparams = searchparams.append('botId', botId);
    searchparams = searchparams.append('fromDate', fromDate.toISOString());
    searchparams = searchparams.append('toDate', toDate.toISOString());

    const str = searchparams.toString();
    this.http.get<any>(URLS.backtesterapiURL + '/backtester?' + str)
      .subscribe(res => {
        this.toastr.info(res.message, 'Backtest');
      })
  }

  public closeConnection(): Promise<void> {
    this.dataSubject.next(undefined);
    return this.hubConnection.stop();
  }

  public addTransferChartDataListener() {
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      this.dataSubject.next(data);
    });
  }

  public broadcastChartData = () => {
    this.hubConnection.invoke('broadcastchartdata', this.data)
    .catch(err => console.error(err));
  }

  public addBroadcastChartDataListener = () => {
    this.hubConnection.on('broadcastchartdata', (data) => {
      this.bradcastedData = data;
    })
  }
}
