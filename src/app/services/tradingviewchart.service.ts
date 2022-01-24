import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { URLS } from 'src/app/services/urls.base';
import { Candle } from '../plot/candlechart/candle.model';
import { IndicatorDescription } from '../plot/tradingviewchart/indicator-description.model';
import { Observable, of } from 'rxjs';
import { Point } from '../plot/tradingviewchart/point.model';
import { genericRetryStrategy } from './genericRetryStrategy';
import { catchError, retryWhen } from 'rxjs/operators';
import { IndicatorCompleteDescription } from '../plot/tradingviewchart/indicator-complete-description.model';

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
                          indicatorDescription.timeFrame)
                          .pipe(
                            retryWhen(genericRetryStrategy()),
                            catchError(error => of(error))
                          );
  }

  getIndicator(indicatorDescription: IndicatorDescription) {
    return this.http.get(URLS.botengineapiURL + '/BotEngine/indicator/' + 
                          indicatorDescription.name + '/' +
                          indicatorDescription.market + '/' +
                          indicatorDescription.marketType + '/' +
                          indicatorDescription.brokerType + '/' +
                          indicatorDescription.timeFrame)
                          .pipe(
                            retryWhen(genericRetryStrategy()),
                            catchError(error => of(error))
                          );

  }

  getLastIndicatorValue(indicatorDescription: IndicatorDescription) {
    return this.http.get(URLS.botengineapiURL + '/BotEngine/indicator/last/' + 
                          indicatorDescription.name + '/' +
                          indicatorDescription.market + '/' +
                          indicatorDescription.marketType + '/' +
                          indicatorDescription.brokerType + '/' +
                          indicatorDescription.timeFrame)
                          .pipe(
                            retryWhen(genericRetryStrategy()),
                            catchError(error => of(error))
                          );

  }

  getAllIndicatorDescriptions(): Observable<IndicatorCompleteDescription[]> {
    const url = this.rootURL + '/Indicators/list';
    return this.http.get<IndicatorCompleteDescription[]>(url)
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

  getIndicatorPointsFromTo(botId, timeFrame, from: Date, to: Date): Observable<{ key: string, value: Point[] }[]> {
    const url = this.rootURL + '/Points/bot/' + botId + '/' + timeFrame + '/' + from.toISOString() + '/' + to.toISOString();
    return this.http.get<{ key: string, value: Point[] }[]>(url)
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

  getCandlesFromTo(market, timeFrame, from: Date, to: Date): Observable<Candle[]> {
    return this.http.get<Candle[]>(this.rootURL + '/Plot/candle/' + market + '/' + timeFrame + '/' + from.toISOString() + '/' + to.toISOString())
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }
  getLastCandle(market, timeFrame): Observable<Candle> {
    return this.http.get<Candle>(this.rootURL + '/Plot/candle/last/' + market + '/' + timeFrame)
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

  getTimeSeries(market, timeframe) {
    return this.http.get(URLS.botengineapiURL + '/BotEngine/timeseries/' + market + '/' + timeframe)
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }
}
