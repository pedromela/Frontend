import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { URLS } from 'src/app/services/urls.base';
import { Candle } from '../plot/candlechart/candle.model';
import { IndicatorDescription } from '../plot/tradingviewchart/indicator-description.model';
import { Observable } from 'rxjs';
import { IndicatorLine } from '../shared/interfaces/indicator-line';
import { Point } from '../plot/tradingviewchart/point.model';

@Injectable({
  providedIn: 'root'
})
export class TradingViewChartService {
  formData: Candle= {
    id :null,
    max: null,
    min: null,
    open: null,
    close: null,
    volume: null,
    volumeQuote: null,
    timestamp: null,
    symbol: null,
    timeFrame: null
  };
  
  //readonly rootURL = 'http://megaladon.ddns.net/BotAPI/api';

  readonly rootURL = URLS.botapiURL;

  list : Candle[];
  auxList : Candle[];

  constructor(private http: HttpClient) { 
    this.list = [];
  }

  letters = '0123456789ABCDEF';
  
  getRandomColor() {
    let color = '#';

    for (let index = 0; index < 6; index++) {
      color += this.letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  getRandomColor2() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const color = `rgb(${r},${g},${b})`
    return color;
  }

  getIndicatorNames(indicatorDescription: IndicatorDescription) {
    return this.http.get(URLS.botengineapiURL + '/BotEngine/indicator/all_names/' + 
                          indicatorDescription.market + '/' +
                          indicatorDescription.marketType + '/' +
                          indicatorDescription.brokerType + '/' +
                          indicatorDescription.timeFrame);
  }

  getIndicator(indicatorDescription: IndicatorDescription) {
    return this.http.get(URLS.botengineapiURL + '/BotEngine/indicator/' + 
                          indicatorDescription.name + '/' +
                          indicatorDescription.market + '/' +
                          indicatorDescription.marketType + '/' +
                          indicatorDescription.brokerType + '/' +
                          indicatorDescription.timeFrame);

  }

  getLastIndicatorValue(indicatorDescription: IndicatorDescription) {
    return this.http.get(URLS.botengineapiURL + '/BotEngine/indicator/last/' + 
                          indicatorDescription.name + '/' +
                          indicatorDescription.market + '/' +
                          indicatorDescription.marketType + '/' +
                          indicatorDescription.brokerType + '/' +
                          indicatorDescription.timeFrame);

  }

  getIndicatorPointsFromTo(botId, timeFrame, from: Date, to: Date): Observable<{ key: string, value: Point[] }[]> {
    const url = this.rootURL + '/Points/bot/' + botId + '/' + timeFrame + '/' + from.toISOString() + '/' + to.toISOString();
    console.log(url);
    return this.http.get<{ key: string, value: Point[] }[]>(url);
  }

  getCandlesFromTo(market, timeFrame, from: Date, to: Date): Observable<Candle[]> {
    return this.http.get<Candle[]>(this.rootURL + '/Plot/candle/' + market + '/' + timeFrame + '/' + from.toISOString() + '/' + to.toISOString());
  }
  getLastCandle(market, timeFrame): Observable<Candle> {
    return this.http.get<Candle>(this.rootURL + '/Plot/candle/last/' + market + '/' + timeFrame);
  }

  getTimeSeries(market, timeframe) {
    return this.http.get(URLS.botengineapiURL + '/BotEngine/timeseries/' + market + '/' + timeframe);
  }

  refreshList(id): number{
    console.log("candlechart.service: refreshList() id is " + id);

    var response = this.http.get(this.rootURL + '/Plot/somePairs/100/' + id);

    response
    .toPromise()
    .then(res => { //Success
      this.auxList = res as Candle[];
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
}
