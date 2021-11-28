import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LineDataUnit } from 'src/app/plot/tradingviewchart/linedataunit.model';
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { Point } from 'src/app/plot/tradingviewchart/point.model';
import { BotProfit } from './bot-profit.model';
import { BotState } from 'src/app/store';
import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/store';
import { combineLatest, Observable } from 'rxjs';
import { delay, distinctUntilChanged, filter, take } from 'rxjs/operators';
import { ResizeObserver } from 'resize-observer';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-bot-profit',
  templateUrl: './bot-profit.component.html',
  styleUrls: ['./bot-profit.component.scss']
})
export class BotProfitComponent implements OnInit, AfterViewInit, OnDestroy {
  loading$: Observable<boolean> = this.store.select(fromStore.BotSelectors.getCurrentBotProfitLoading).pipe(delay(50));
  profitSettings$: Observable<string[][]> = this.store.select(fromStore.BotSelectors.getCurrentBotProfitSettings);
  profitData$: Observable<BotProfit[]> = this.store.select(fromStore.BotSelectors.getCurrentBotProfitData);

  public profitSeriesData: LineDataUnit[];
  public drawbackSeriesData: LineDataUnit[];
  public chart: IChartApi;
  profitSeries: ISeriesApi<"Line">;
  drawbackSeries: ISeriesApi<"Line">;

  private _subs: SubSink = new SubSink();

  constructor(
    public store: Store<BotState>,
  ) {
    this.profitSeriesData = [];
    this.drawbackSeriesData = [];
  }

  ngOnInit() {
    this._subs.add(this.store.select(fromStore.BotSelectors.getCurrentBotId)
    .pipe(
      filter((botId) => {
        return !!botId;
      }),
    )
    .subscribe(() => {
      this.store.dispatch(fromStore.BotActions.loadCurrentBotProfit());
    }));

    this._subs.add(combineLatest([
      this.store.select(fromStore.BotSelectors.getCurrentBotFrom),
      this.store.select(fromStore.BotSelectors.getCurrentBotTo),
    ])
    .pipe(
      distinctUntilChanged(),
      filter(([from, to]) => {
        return !!from && !!to;
      }),
    )
    .subscribe(([from, to]) => {
      this.store.dispatch(fromStore.BotActions.loadCurrentBotProfitData({ from, to }));
    }));
    this.refreshList();
  }

  ngAfterViewInit() {
    this.CreateChart();
  }
  
  ngOnDestroy() {
    this._subs.unsubscribe;
  }

  resize() {
    var container = document.getElementById('profit_chart');
    this.chart.applyOptions({ width: container?.offsetWidth});
  }

  public CreateChart() {
    var container = document.getElementById('profit_chart');

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
    profitSeries.setData(this.profitSeriesData);

    var container = document.getElementById('profit_chart');
    var legend = document.createElement('div');
    legend.className='indicator-legend';
    container.appendChild(legend);
    legend.style.top = (i++)*15 + 'px';
    let lastValue = this.profitSeriesData[this.profitSeriesData.length -1];
    this.setLegendText('Profit', lastValue.value, legend, color);
    
    this.chart.subscribeCrosshairMove((param) => {
      this.setLegendText('Profit', param.seriesPrices.get(profitSeries), legend, color);
    });

    let color2 = 'red';
    const drawbackSeries = this.chart.addLineSeries({
      color: color2
    });
    this.drawbackSeries = drawbackSeries;
    drawbackSeries.setData(this.drawbackSeriesData);

    var legend2 = document.createElement('div');
    legend2.className='indicator-legend';
    container.appendChild(legend2);
    legend2.style.top = (i++)*15 + 'px';
    let lastValue2 = this.drawbackSeriesData[this.drawbackSeriesData.length -1];
    this.setLegendText('Draw back', lastValue2.value, legend2, color2);
    
    this.chart.subscribeCrosshairMove((param) => {
      this.setLegendText('Draw back', param.seriesPrices.get(drawbackSeries), legend2, color2);
    });
  }


  public UpdateSeries() {
    this.profitSeries.setData(this.profitSeriesData);
    this.drawbackSeries.setData(this.drawbackSeriesData);
  }

  public refreshList() {
    let first = true;
    this.profitData$
    .pipe(
      distinctUntilChanged(),
      filter((profits) => !!profits && profits.length > 0),
    )
    .subscribe((profits) => {
      const profitList = profits.map(profit => {
        const point: Point = {
          value: profit.profitValue,
          timestamp: profit.timestamp
        }
        return new LineDataUnit(point);
      });
      this.profitSeriesData = profitList;

      const drawbackList = profits.map(profit => {
        const point: Point = {
          value: -profit.drawBack,
          timestamp: profit.timestamp
        }
        return new LineDataUnit(point);
      });
      this.drawbackSeriesData = drawbackList;
      if (first) {
        this.CreateSeries();
        first = false;
      } else {
        this.UpdateSeries();
      }
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
