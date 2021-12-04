import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import * as fromStore from 'src/app/bots/bot-backtesting/store';
import { BacktesterSignalRService } from 'src/app/services/backtester-signal-r.service';
import { URLS } from 'src/app/services/urls.base';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexDataLabels,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import { ChartModel } from 'src/app/shared/interfaces/chartmodel';
import { ToastrService } from 'ngx-toastr';
import { BotDetail } from '../bot-detail-list/bot-detail.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  colors: string[];
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  grid: ApexGrid;
};
@Component({
  selector: 'app-bot-backtest',
  templateUrl: './bot-backtest.component.html',
  styles: []
})
export class BotBacktestComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  loading: boolean = false;
  data$: Observable<ChartModel[]> = this.backtesterSignalRService.dataSubject.asObservable();
  botDetail$: Observable<BotDetail> = this.store.select(fromStore.BotBacktestSelectors.getCurrentBot);

  private botId: string;
  today = new Date();
  nextweek = new Date(this.today);
  formGroup: FormGroup = this.fb.group({
    startDate: this.addDays(this.today, -7),
    endDate: this.today
  });

  get startDateCtrl() {
    return this.formGroup.get('startDate') as FormControl;
  }

  get endDateCtrl() {
    return this.formGroup.get('endDate') as FormControl;
  }

  private _subs = new SubSink();

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    public backtesterSignalRService: BacktesterSignalRService,
    private http: HttpClient,
    public store: Store<fromStore.BotBacktestState>,
  ) {
    this.chartOptions = {
      series: [
        {
          data: [0, 0]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          "Positions",
          "Successes"
        ],
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
            ],
            fontSize: "12px"
          }
        }
      },
      title: {
        text: "Success bar chart"
      },
    };
  }

  ngOnInit() {
    this.botId = this.route.snapshot.params.id;
    this.store.dispatch(fromStore.BotBacktestActions.loadCurrentBot({ id: this.botId }));
    this.store.dispatch(fromStore.BotBacktestActions.loadCurrentBotId({ id: this.botId }));
  }

  ngAfterViewInit() {
    this._subs.add(this.data$.subscribe((data) => {
      if (data) {
        const dataMapped = data.map((e) => e.data[0]);
        if(dataMapped[0] === -1 && dataMapped[1] === -1) {
          this.backtesterSignalRService.closeConnection();
          this.store.dispatch(fromStore.BotBacktestActions.loadCurrentBotPrices({
            from: this.startDateCtrl.value,
            to: this.endDateCtrl.value,
            reloadData: true
          }));
          this.store.dispatch(fromStore.BotBacktestActions.loadCurrentBotHistoryTrades({ from: this.startDateCtrl.value, to: this.endDateCtrl.value }));
          this.store.dispatch(fromStore.BotBacktestActions.loadCurrentBotActiveTrades({ from: this.startDateCtrl.value, to: this.endDateCtrl.value }));
          this.toastr.info('Backtest completed!', 'Backtest');
          this.loading = false;
          return;
        }
        this.chart.updateSeries([{
          data : dataMapped
        }]);
      }
    }));
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
    this.store.dispatch(fromStore.BotBacktestActions.clearCurrentBot());
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

  public chartClicked = (event) => {
    this.backtesterSignalRService.broadcastChartData();
  }

  public backtest() {
    this.loading = true;
    this.backtesterSignalRService.startConnection(this.botId, this.startDateCtrl.value, this.endDateCtrl.value);
    this.backtesterSignalRService.addTransferChartDataListener();
    this.backtesterSignalRService.addBroadcastChartDataListener();
    this.startHttpRequest(this.botId, this.startDateCtrl.value, this.endDateCtrl.value);
    this.store.dispatch(fromStore.BotBacktestActions.setCurrentBotFrom({ from: this.startDateCtrl.value }));
    this.store.dispatch(fromStore.BotBacktestActions.setCurrentBotTo({ to: this.endDateCtrl.value }));
  }
  
  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
