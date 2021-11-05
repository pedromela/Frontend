import { Component, Input } from "@angular/core";
import { ISeriesApi} from 'lightweight-charts';
import { Candle } from "../candlechart/candle.model";
import { ActivatedRoute, Params } from "@angular/router";
import { BotDetail } from "src/app/bots/bot-detail-list/bot-detail.model";
import { LineDataUnit } from "./linedataunit.model";
import { IndicatorDescription } from "./indicator-description.model";
import { BotDetailService } from "src/app/services/bot-detail.service";
import { TransactionDetailService } from "src/app/services/transaction-detail.service";
import { TradingViewChartService } from "src/app/services/tradingviewchart.service";
@Component({
  selector: "app-tradingviewchart-indicator",
  templateUrl: "./tradingviewchart-indicator.component.html",
  styleUrls: ["./tradingviewchart-indicator.component.css"]
})
export class TradingViewChartIndicatorComponent {
  public indicator: any;
  @Input() botId: string;
  botParameters: BotDetail;
  indicatorSeries :ISeriesApi<"Line">[];
  public indicatorSeriesDatafixme: LineDataUnit[];

  indicatorNames: string[];
  selectedIndicatorName: string = "i_VWAP";


  constructor(
    public route: ActivatedRoute,
    public candleService: TradingViewChartService,
    public transactionService: TransactionDetailService,
    public botService: BotDetailService
  ) {
  }

  ngOnInit() {
    if (this.botId == undefined) {
      // this.data = this.route.snapshot.params;
      // this.botId = this.data.id;
    }
    this.CreateSeries();
  }

  public async Update(name: string) {
    this.selectedIndicatorName = name;
    await this.refreshList();
    //this.chart.removeSeries(this.indicatorSeries);
    var list = this.indicator.lines.values;
    this.indicatorSeriesDatafixme = list.map(candle => new LineDataUnit(candle[0]));

    //this.indicatorSeries.push(this.chart.addLineSeries());
    //this.indicatorSeries.setData(this.indicatorSeriesDatafixme);
  }

  public async addLastIndicatorValue() {

    const indicatorDescription : IndicatorDescription = {
      name : this.selectedIndicatorName,
      market : this.botParameters.market,
      marketType : 1,
      brokerType : 0,
      timeFrame : this.botParameters.timeFrame
    };

    var response = this.candleService.getLastIndicatorValue(indicatorDescription);
    await response
    .toPromise()
    .then(res => { //Success
        var candle = res as Candle;
        console.log(candle);
        //this.indicatorSeries.update(new LineDataUnit(candle));    
      },
      msg => { //Error
        console.log(msg);
      });
  }

  public async CreateSeries() {
    if(this.botId == undefined) {
      return;
    }
    // await super.GetBotParameters();
    // await super.GetHistoryTransactions();
    // await super.GetActiveTransactions();


    // this.chart = createChart('chart', {
    //     height: document.body.offsetHeight/2,
    //     timeScale: {
    //       timeVisible: true,
    //       secondsVisible: true,
    //       borderColor: '#D1D4DC',
    //     },
    //     rightPriceScale: {
    //         borderColor: '#D1D4DC',
    //     },
    //      layout: {
    //       backgroundColor: '#ffffff',
    //       textColor: '#000',
    //     },
    //     grid: {
    //       horzLines: {
    //         color: '#F0F3FA',
    //       },
    //       vertLines: {
    //         color: '#F0F3FA',
    //       },
    //     },
    //   });
      
    //   this.series = this.chart.addCandlestickSeries({
    //           upColor: 'rgb(38,166,154)',
    //           downColor: 'rgb(255,82,82)',
    //           wickUpColor: 'rgb(38,166,154)',
    //           wickDownColor: 'rgb(255,82,82)',
    //           borderVisible: false,
    //     });

    // this.series.setData(this.seriesData);

    // await this.LoadMarkers();

    await this.GetIndicatorNames();
    await this.refreshList();

    var list2 = this.indicator.lines.values;
    this.indicatorSeriesDatafixme = list2.map(candle => new LineDataUnit(candle[0]));
      
    //this.indicatorSeries = this.chart.addLineSeries();
    //this.indicatorSeries.setData(this.indicatorSeriesDatafixme);

    // interval(this.botParameters.timeFrame * 60000)
    // .pipe(takeWhile(() => !this.stop))
    // .subscribe(() => {
    //   this.addLastCandle();
    //   this.addLastIndicatorValue();
    // });

  }

  public async refreshList() {
    const indicatorDescription : IndicatorDescription = {
      name : this.selectedIndicatorName,
      market : this.botParameters.market,
      marketType : 1,
      brokerType : 0,
      timeFrame : this.botParameters.timeFrame
    };

    var response = this.candleService.getIndicator(indicatorDescription);
    await response
    .toPromise()
    .then(res => { //Success
      this.indicator = res;
    }, msg => { //Error
        console.log(msg);
    });
  }

  public async GetIndicatorNames() 
  {
    const indicatorDescription : IndicatorDescription = {
      name : '',
      market : this.botParameters.market,
      marketType : 1,
      brokerType : 0,
      timeFrame : this.botParameters.timeFrame
    };

    var response = this.candleService.getIndicatorNames(indicatorDescription);
    await response
    .toPromise()
    .then(res => { //Success
      this.indicatorNames = res as string[];
      console.log(this.indicatorNames);
    }, msg => { //Error
        console.log(msg);
    });
  }
}
