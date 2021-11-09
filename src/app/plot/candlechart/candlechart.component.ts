import { Component, ViewChild } from "@angular/core";
import { interval } from "rxjs";
import { Candle } from "./candle.model";
import { CandleChartUnit } from "./candlechart.model";
import { CandleChartService } from "./candlechart.service";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { takeWhile } from "rxjs/operators";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-candlechart",
  templateUrl: "./candlechart.component.html",
  styleUrls: ["./candlechart.component.css"]
})
export class CandleChartComponent {
  @ViewChild("chart") public chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public series: any[];
  public list: Candle[];
  private id: any;
  private stop: boolean;

  constructor(public candleService: CandleChartService ) {
      this.series = [];
      this.list = [];
      this.stop = false;
      interval(60000)
      .pipe(takeWhile(() => !this.stop))
      .subscribe(() => {
        this.addLastCandle();
        this.chart.updateSeries(this.series);

      });
  }

  ngOnInit() {
    this.CreateSeries();
    //this.id = setInterval(this.addLastCandle, 60000);
    this.chartOptions.chart.redrawOnParentResize = true;
    this.chart.autoUpdateSeries = true;
  }

  // ngOnDestroy() {
  //   if(this.id) {
  //     clearInterval(this.id);
  //   }
  // }

  public async addLastCandle() {
    var response = this.candleService.getLastCandle();
    await response
    .toPromise()
    .then(res => { //Success
      var candle = res as Candle;
      this.series.push(new CandleChartUnit(candle));
      this.chart.updateSeries([{
        data: this.series
      }]);
    }, msg => { //Error
        console.log(msg);
    });
  }

  public async refreshList() {
    var response = this.candleService.getSomeCandles(0);
    await response
    .toPromise()
    .then(res => { //Success
      this.list = res as Candle[];
    }, msg => { //Error
        console.log(msg);
    });
  }
  
  public async CreateSeries() {
    await this.refreshList();
    var list = this.list;
    this.series = this.list.map(candle => new CandleChartUnit(candle));
    this.chartOptions = {
        series: [
          {
            name: "candle",
            data: this.series
          }
        ],
        chart: {
          type: "candlestick",
          height: window.innerHeight,
          width: window.innerWidth
        },
        title: {
          text: "CandleStick Chart",
          align: "left"
        },
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      };
  }

  public generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([baseval, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
}
