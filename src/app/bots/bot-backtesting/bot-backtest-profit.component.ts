import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LineDataUnit } from 'src/app/plot/tradingviewchart/linedataunit.model';
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { Point } from 'src/app/plot/tradingviewchart/point.model';
import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/bots/bot-backtesting/store';
import { combineLatest, interval, Observable, of } from 'rxjs';
import { catchError, delay, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ResizeObserver } from 'resize-observer';
import { SubSink } from 'subsink';
import { BotProfit } from '../bot-detail-list/bot-profit.model';
import { BacktesterSignalRService } from 'src/app/services/backtester-signal-r.service';
import { BacktestData } from 'src/app/shared/interfaces/chartmodel';

@Component({
  selector: 'app-bot-backtest-profit',
  templateUrl: './bot-backtest-profit.component.html',
  styleUrls: ['./bot-backtest-profit.component.scss']
})
export class BotBacktestProfitComponent implements OnInit, AfterViewInit, OnDestroy {
  loading$: Observable<boolean> = combineLatest([
    this.store.select(fromStore.BotBacktestSelectors.getCurrentBotProfitLoading).pipe(delay(50)),
    this.store.select(fromStore.BotBacktestSelectors.getCurrentBotProfitDataLoading).pipe(delay(50))
  ]).pipe(
    map(([profitLoading, proditDataLoading]) => {
      return profitLoading || proditDataLoading;
  }));
  profitSettings$: Observable<string[][]> = this.store.select(fromStore.BotBacktestSelectors.getCurrentBotProfitSettings);
  profitData$: Observable<BotProfit[]> = this.store.select(fromStore.BotBacktestSelectors.getCurrentBotProfitData);
  data$: Observable<BacktestData> = this.backtesterSignalRService.dataSubject.asObservable();

  public chart: IChartApi;
  profitSeries: ISeriesApi<"Line">;
  drawbackSeries: ISeriesApi<"Line">;

  private _subs: SubSink = new SubSink();

  constructor(
    public backtesterSignalRService: BacktesterSignalRService,
    public store: Store<fromStore.BotBacktestState>,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(fromStore.BotBacktestActions.loadCurrentBotProfit({ 
      data: {
        positions: 0,
        successes: 0,
        currentProfit: 0,
        maxDrawBack: 0,
        activeTransactions: 0,
        amountGained: 0,
        candles: [],
        lines: null,
        lineNames: [],
        state: 0,
        timestamp: null
      } 
    }));
    this.CreateChart();
    this.CreateSeries();
   }

  ngAfterViewInit() {
    this._subs.add(this.data$
    .subscribe((data) => {
      console.log(data);
      if (data) {
        if(data.state === 2) {
          return;
        }
        const point: Point = {
          value: data.currentProfit < 0 ? data.currentProfit : 0,
          timestamp: data.timestamp
        }
        this.drawbackSeries.update(new LineDataUnit(point));
        const point2: Point = {
          value: data.amountGained,
          timestamp: data.timestamp
        }
        this.profitSeries.update(new LineDataUnit(point2));
      } else if (data === null) {
        this.drawbackSeries.setData([]);
        this.profitSeries.setData([]);
      }
    }, (error) => {
      console.log(error);
    }));
  }
  
  ngOnDestroy() {
    this._subs.unsubscribe;
  }

  resize() {
    var container = document.getElementById('profit_chart2');
    this.chart.applyOptions({ width: container?.offsetWidth});
  }

  public CreateChart() {
    var container = document.getElementById('profit_chart2');

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

    const resize = new ResizeObserver((entries) => {
      this.resize()
    });
    resize.observe(container);
  }


  public CreateSeries() {

    let i = 0;
    let color = 'blue';
    const profitSeries = this.chart.addLineSeries({
      color: color
    });
    this.profitSeries = profitSeries;

    var container = document.getElementById('profit_chart2');
    var legend = document.createElement('div');
    legend.className='indicator-legend';
    container.appendChild(legend);
    legend.style.top = (i++)*15 + 'px';
    this.setLegendText('Profit', 0, legend, color);
    this.chart.subscribeCrosshairMove((param) => {
      this.setLegendText('Profit', param.seriesPrices.get(profitSeries), legend, color);
    });

    let color2 = 'red';
    const drawbackSeries = this.chart.addLineSeries({
      color: color2
    });
    this.drawbackSeries = drawbackSeries;

    var legend2 = document.createElement('div');
    legend2.className='indicator-legend';
    container.appendChild(legend2);
    legend2.style.top = (i++)*15 + 'px';
    this.setLegendText('Draw back', 0, legend2, color2);
    this.chart.subscribeCrosshairMove((param) => {
      this.setLegendText('Draw back', param.seriesPrices.get(drawbackSeries), legend2, color2);
    });
  }

  public setLegendText(name, priceValue, legend: HTMLElement, color: string) {
    let val = 'n/a';

    if (priceValue !== undefined) {
      val = priceValue;//(Math.round(priceValue * 100) / 100).toFixed(5);
    }
    legend.innerHTML = name + '<span style="color:' + color + '"> ' + val + '</span>'
  }

  colorCondition(pd) {
    return 'table-info';
  }
}
