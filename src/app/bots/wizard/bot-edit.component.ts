import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BotDetail } from '../bot-detail-list/bot-detail.model';
import { FormGroup, NgForm } from '@angular/forms';
import { StrategyData } from '../strategy/strategy-data.model';
import { BotIsVirtualComponent } from './bot-isvirtual.component';
import { StrategyDataService } from 'src/app/services/strategy-data.service';
import { BotActions, BotSelectors, BotState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { delay, filter, take, tap } from 'rxjs/operators';
import * as fromStore from 'src/app/store';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { cloneDeep } from 'lodash';
@Component({
  selector: 'app-bot-edit',
  templateUrl: './bot-edit.component.html',
  styleUrls: ['./bot-edit.component.scss']
})
export class BotEditComponent implements OnInit, AfterViewInit {
  loading$: Observable<boolean> = this.store.select(fromStore.BotSelectors.getLoading).pipe(delay(50));
  strategies$: Observable<StrategyData[]> = this.store.select(BotSelectors.getStrategies)
  .pipe(
    tap((strategies) => {
      if (!strategies || strategies.length == 0) {
        this.store.dispatch(BotActions.loadStrategies());
      }
    })
  );

  @ViewChild(BotIsVirtualComponent) isVirtualChild : BotIsVirtualComponent;
  @Output() public botDetailEvent = new EventEmitter<any>();
  @Input() set formModel(formModel: BotDetail) {
    if (!!formModel) {
      this._formModel = Object.assign({}, formModel);
    }
  }
  _formModel: BotDetail = {
      id :"",
      botId: "",
      strategyId: "",
      mutatedBotId: "",
      equityId: "",
      botName: "",
      timeFrame: 0,
      maxInterval: 400,
      decrease: 0,
      increase: 0,
      decreaseP: 0,
      increaseP: 0,
      trailingStopValueP: 0,
      defaultTransactionAmount: 0,
      startEquity: 0,
      smartBuyTransactions: false,
      smartSellTransactions: false,
      stopLoss: false,
      takeProfit: false,
      trailingStop : false,
      trailingStopValue: 0,
      lockProfits: false,
      upPercentage: 0,
      downPercentage: 0,
      minSmartBuyTransactions: 0,
      minSmartSellTransactions: 0,
      buyAfterSellTransactions: 5,
      isVirtual: true,
      initLastProfitablePrice: -1,
      stopAfterStopLossMinutes: -1,
      stopLossMaxAtemptsBeforeStopBuying: -1,
      userId: "",
      accessPointId: "",
      market: "",
      brokerId: 0,
      brokerType: 0,
      recentlyCreated: false,
      recentlyModified: false,
      recentlyDeleted: false,
      maxSellTransactionsByFrame: 1,
      quickReversal: false,
      superReversal: false
  };
  TimeFrames : any[] = [
    {value: 1, viewValue: 'M1'},
    {value: 5, viewValue: 'M5'},
    {value: 15, viewValue: 'M15'},
    {value: 30, viewValue: 'M30'},
    {value: 60, viewValue: 'H1'},
  ];
  BrokerTypes : any[] = [
    {value: 0, viewValue: 'Exchange'},
    {value: 1, viewValue: 'Margin'},
    {value: 2, viewValue: 'Exchange Dev'},
    {value: 3, viewValue: 'Margin Dev'},
  ];

  formGroup: FormGroup;

  private _subs = new SubSink();

  constructor( 
              public router: Router, 
              public strategyService: StrategyDataService,
              public store: Store<BotState>,
            ) {
   }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this._formModel) {
      this._formModel.increaseP = this._formModel.increase*100;
      this._formModel.decreaseP = this._formModel.decrease*100;
      this._formModel.trailingStopValueP = this._formModel.trailingStopValue*100;

    }
  }

  onSubmit(form: NgForm) {
    this._formModel.market = this.isVirtualChild._formModel.market;
    this._formModel.isVirtual = this.isVirtualChild._formModel.isVirtual;
    
    if(!this.isVirtualChild._formModel.isVirtual) 
    {
      this._formModel.accessPointId = this.isVirtualChild._formModel.accessPointId;
      this._formModel.brokerId = this.isVirtualChild._formModel.brokerId;
      this._formModel.defaultTransactionAmount = this.isVirtualChild._formModel.defaultTransactionAmount;
    }

    this._formModel.increase = this._formModel.increaseP > 0 ? this._formModel.increaseP/100 : 0; 
    this._formModel.decrease = this._formModel.decreaseP > 0 ? this._formModel.decreaseP/100 : 0; 
    this._formModel.trailingStopValue = this._formModel.trailingStopValueP > 0 ? this._formModel.trailingStopValueP/100 : 0; 
    if(this._formModel.botId == null || this._formModel.botId == "") {
      this._formModel.recentlyCreated = true;
      this.store.dispatch(BotActions.createBot({ formData: cloneDeep(this._formModel) }));
    }
    else {
      this._formModel.recentlyModified = true;
      this.store.dispatch(BotActions.modifyBot({ formData: cloneDeep(this._formModel) }));
    }
    this._subs.add(this.store.select(BotSelectors.getNavigate)
    .pipe(
      filter((navigate) => !!navigate),
      take(1)
    )
    .subscribe(() => {
      this.botDetailEvent.emit(this._formModel);
      this.store.dispatch(BotActions.resetNavigate());
      this.router.navigateByUrl('/bots');
    }));
  }

}
