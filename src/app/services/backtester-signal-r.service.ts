import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { BehaviorSubject } from 'rxjs';
import { ChartModel } from '../shared/interfaces/chartmodel';
import { URLS } from './urls.base';

@Injectable({
  providedIn: 'root'
})
export class BacktesterSignalRService {
  public data: ChartModel[];
  public dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public bradcastedData: ChartModel[];
  private hubConnection: signalR.HubConnection

  public startConnection(botId: string, fromDate: Date, toDate: Date) {
    let searchparams = new HttpParams();
    searchparams = searchparams.append('botId', botId);
    searchparams = searchparams.append('fromDate', fromDate.toISOString());
    searchparams = searchparams.append('toDate', toDate.toISOString());

    const str = searchparams.toString();

    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(URLS.backtestersignalrapiURL + '/backtester')
                            .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => {
        console.log('Error while starting connection: ' + err);
      })
  }

  public closeConnection() {
    this.hubConnection.stop();
  }

  public addTransferChartDataListener() {
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      this.dataSubject.next(data);
      console.log(data);
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
