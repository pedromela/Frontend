import { AfterViewInit, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { SubSink } from "subsink";

import { combineLatest, Observable } from "rxjs";
import { delay, distinctUntilChanged, filter, take, withLatestFrom } from "rxjs/operators";

import { createChart, IChartApi, ISeriesApi} from 'lightweight-charts';
import { TransactionDetail } from './../../transactions/transaction-detail-list/transaction-detail.model'; 
import { ActivatedRoute, Params } from "@angular/router";
import { BotDetail } from "src/app/bots/bot-detail-list/bot-detail.model";
import { BotDetailService } from "src/app/services/bot-detail.service";
import { TransactionDetailService } from "src/app/services/transaction-detail.service";
import { TradingViewChartService } from "src/app/services/tradingviewchart.service";
import { Store } from "@ngrx/store";
import * as fromStore from 'src/app/bots/bot-backtesting/store';
import { ResizeObserver } from "resize-observer";
import { IndicatorSeries } from "src/app/plot/tradingviewchart/indicatorseries.model";
import { Candle } from "src/app/plot/candlechart/candle.model";
import { BarDataUnit } from "src/app/plot/tradingviewchart/bardataunit.model";
import { BacktestData } from "src/app/shared/interfaces/chartmodel";
import { BacktesterSignalRService } from "src/app/services/backtester-signal-r.service";
import { LineDataUnit } from "src/app/plot/tradingviewchart/linedataunit.model";
import { Point } from "src/app/plot/tradingviewchart/point.model";

@Component({
  selector: 'app-bot-backtest-chart',
  templateUrl: './bot-backtest-chart.component.html',
  styleUrls: ['bot-backtest-chart.component.scss']
})
export class BotBacktestChartComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() botId: string;
  chart: IChartApi;
  indicatorSeries: { [name: string]: ISeriesApi<"Line"> } = null;
  series: ISeriesApi<"Candlestick">;
  seriesData: BarDataUnit[];

  loading$: Observable<boolean> = this.store.select(fromStore.BotBacktestSelectors.getCurrentBotLoading).pipe(delay(50));
  priceSeries$: Observable<Candle[]> = this.store.select(fromStore.BotBacktestSelectors.getCurrentBotPriceSeries);
  indicatorSeries$: Observable<IndicatorSeries[]> = this.store.select(fromStore.BotBacktestSelectors.getCurrentBotIndicatorSeries);
  historyTransactions$ : Observable<TransactionDetail[]> = this.store.select(fromStore.BotBacktestSelectors.getCurrentBotHistoryTrades);
  activeTransactions$ : Observable<TransactionDetail[]> = this.store.select(fromStore.BotBacktestSelectors.getCurrentBotActiveTrades);
  botParameters$: Observable<BotDetail> = this.store.select(fromStore.BotBacktestSelectors.getCurrentBot);
  reloadData$: Observable<boolean> = this.store.select(fromStore.BotBacktestSelectors.getCurrentBotReloadData);
  data$: Observable<BacktestData> = this.backtesterSignalRService.dataSubject.asObservable();

  markers: any[];
  stop: boolean;
  data: Params;

  private _subs = new SubSink();

  constructor(
    public route: ActivatedRoute,
    public candleService: TradingViewChartService,
    public transactionService: TransactionDetailService,
    public botService: BotDetailService,
    public backtesterSignalRService: BacktesterSignalRService,
    public store: Store<fromStore.BotBacktestState>,
  ) {
      this.seriesData = [];
      this.markers = [];
  }

  ngOnInit() {
    if (this.botId == undefined) {
      this.data = this.route.snapshot.params;
      this.botId = this.data.id;
    }
  }

  ngAfterViewInit() {
    if(this.botId == undefined) {
      return;
    }
    let first = true;

    this._subs.add(this.data$
      .subscribe((data) => {
        console.log(data);
        if (data) {
          if(data.state === 2) {
            this.LoadMarkers();
            return;
          }
          if (data.state === 0) {
            if (first) {
              this.CreateChart();
              first = false;
            }
            this.CreateSeries(data);
          }
          data.candles.forEach((candle) => {
            this.series.update(new BarDataUnit(candle));
          });
          data.lines.values.forEach((value) => {
            const lineNames = Object.keys(value);
            lineNames.forEach((lineName) => {
              const descriptor = Object.getOwnPropertyDescriptor(value, lineName);
              const point: Point = {
                value: descriptor.value.close,
                timestamp: descriptor.value.timestamp
              }
              const indicatorSeries = this.indicatorSeries[lineName];
              indicatorSeries.update(new LineDataUnit(point));
            });
          });
        }
      }, (error) => {
        console.log(error);
      }));
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  public sortByDateAsc(t1:TransactionDetail, t2:TransactionDetail): number {
    if(t1.timestamp > t2.timestamp) {
      return 1;
    } else if(t1.timestamp === t2.timestamp) {
      return 0;
    } else {
      return -1;
    }
  }

  public AddMarkers(series :ISeriesApi<"Candlestick">, transactions : TransactionDetail[]) {
    if(transactions == undefined) {
      return;
    }
    this.markers = [];
    series.setMarkers(this.markers);
    transactions.sort(this.sortByDateAsc);
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].active) {
        this.AddActiveMarker(transactions[i]);
      }
      else {
        this.AddHistoryMarker(transactions[i]);
      }
    }
    //markers.push({ time: this.series[this.series.length - 48].time, position: 'aboveBar', color: '#f68410', shape: 'circle', text: 'D' });
    series.setMarkers(this.markers);
  }

  public AddActiveMarker(transaction : TransactionDetail) {
    if(transaction.type == 0) {
      this.AddActiveBuyMarker(transaction);
    }
    else if(transaction.type == 4) 
    {
      this.AddActiveSellMarker(transaction);
    }
    //series.setMarkers(this.markers);
  }

  public AddHistoryMarker(transaction : TransactionDetail) {
    if(transaction.type == 0) {
      this.AddBuyMarker(transaction);
    }
    else if(transaction.type == 4) 
    {
      this.AddSellMarker(transaction);
    }
    else if(transaction.type == 2) 
    {
      this.AddBuyMarker(transaction);
    }
    else if(transaction.type == 6) 
    {
      this.AddSellMarker(transaction);
    }
    else if(transaction.type == 1) 
    {
      this.AddBuyCloseMarker(transaction);
    }
    else if(transaction.type == 5) 
    {
      this.AddSellCloseMarker(transaction);
    }
    //series.setMarkers(this.markers);
  }

  public AddActiveSellMarker(transaction : TransactionDetail) 
  {
    var timestamp = new Date(transaction.timestamp).getTime()/1000;
    this.markers.push({ time: timestamp, position: 'aboveBar', color: '#000096', shape: 'arrowDown', text: 'Sell @ ' + transaction.amount });
  }

  public AddActiveBuyMarker(transaction : TransactionDetail) 
  {
    var timestamp = new Date(transaction.timestamp).getTime()/1000;
    this.markers.push({ time: timestamp, position: 'belowBar', color: '#000096', shape: 'arrowUp', text: 'Buy @ ' + transaction.amount });
  }

  public AddSellMarker(transaction : TransactionDetail) 
  {
    var timestamp = new Date(transaction.timestamp).getTime()/1000;
    this.markers.push({ time: timestamp, position: 'aboveBar', color: '#e91e63', shape: 'arrowDown', text: 'Sell @ ' + transaction.amount });
  }

  public AddBuyMarker(transaction : TransactionDetail) 
  {
    var timestamp = new Date(transaction.timestamp).getTime()/1000;
    this.markers.push({ time: timestamp, position: 'belowBar', color: '#009600', shape: 'arrowUp', text: 'Buy @ ' + transaction.amount });
  }

  public AddSellCloseMarker(transaction : TransactionDetail) 
  {
    var timestamp = new Date(transaction.timestamp).getTime()/1000;
    this.markers.push({ time: timestamp, position: 'belowBar', color: '#e91e63', shape: 'arrowUp', text: 'SellClose @ ' + transaction.amount });
  }

  public AddBuyCloseMarker(transaction : TransactionDetail) 
  {
    var timestamp = new Date(transaction.timestamp).getTime()/1000;
    this.markers.push({ time: timestamp, position: 'aboveBar', color: '#009696', shape: 'arrowDown', text: 'BuyClose @ ' + transaction.amount });
  }

  private resize() {
    var container = document.getElementById('backtest_chart');
    if (!!container)
      this.chart.applyOptions({ width: container.offsetWidth});
  }

  private CreateChart() {
    var container = document.getElementById('backtest_chart');

    this.chart = createChart(container, {
        height: document.body.offsetHeight/2,
        width: container.offsetWidth,
        timeScale: {
          timeVisible: true,
          secondsVisible: true,
          borderColor: '#D1D4DC',
        },
        rightPriceScale: {
            borderColor: '#D1D4DC',
        },
         layout: {
          backgroundColor: '#ffffff',
          textColor: '#000',
        },
        grid: {
          horzLines: {
            color: '#F0F3FA',
          },
          vertLines: {
            color: '#F0F3FA',
          },
        },
    });

    this.series = this.chart.addCandlestickSeries({
      upColor: 'rgb(38,166,154)',
      downColor: 'rgb(255,82,82)',
      wickUpColor: 'rgb(38,166,154)',
      wickDownColor: 'rgb(255,82,82)',
      borderVisible: false,
    });

    const resize = new ResizeObserver((entries) => {
      this.resize()
    });
    resize.observe(container);
  }
  
  public async CreateSeries(data: BacktestData) {
    this.series.setData([]);
    if(this.indicatorSeries != null) {
      const keys = Object.keys(this.indicatorSeries);
      keys.forEach((key) => {
        const descriptor = Object.getOwnPropertyDescriptor(this.indicatorSeries, key);
        descriptor.value.setData([]);
      });
    }
    this.indicatorSeries = {};
    let i = 0;
    data.lineNames?.forEach((line) => {
      const color = this.candleService.getRandomColor();
      this.indicatorSeries[line] = this.chart.addLineSeries({
        color: color
      }); 
      this.indicatorSeries[line].setData([]);

      var container = document.getElementById('backtest_chart');
      var legend = document.createElement('div');
      legend.className='indicator-legend';
      container.appendChild(legend);
      legend.style.top = (i++)*15 + 'px';

      this.setLegendText(line, 0, legend, color);
      
      this.chart.subscribeCrosshairMove((param) => {
        if (this.indicatorSeries != null) {
          this.setLegendText(line, param.seriesPrices.get(this.indicatorSeries[line]), legend, color);
        }
      });
      this.markers = [];
      this.series.setMarkers(this.markers);
    });
  }

  public setLegendText(name, priceValue, legend: HTMLElement, color: string) {
    let val = 'n/a';

    if (priceValue !== undefined) {
      val = priceValue;//(Math.round(priceValue * 100) / 100).toFixed(5);
    }
    legend.innerHTML = name + '<span style="color:' + color + '"> ' + val + '</span>'
  }

  public async LoadMarkers() {
    this._subs.add(combineLatest([
      this.activeTransactions$,
      this.historyTransactions$
    ])
    .pipe(
      distinctUntilChanged(),
      filter(([activeTransactions, historyTransactions]) => {
        return !!activeTransactions && !!historyTransactions;
      })
    )
    .subscribe(([activeTransactions, historyTransactions]) => {
      let transactions : TransactionDetail[] = [];
      if(activeTransactions) {
        transactions = transactions.concat(activeTransactions);
      }
      if(historyTransactions) {
        transactions = transactions.concat(historyTransactions);
      }
      this.AddMarkers(this.series, transactions);
    }));
  }
}
