import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AccessPointDetail } from 'src/app/accesspoints/acesspoints-detail-list/accesspoint-detail.model';
import { BotDetailService } from 'src/app/services/bot-detail.service';
import { SubscriptionPackage } from 'src/app/shared/models/subscription-package.model';
import { BotDetail } from './bot-detail.model';
import { UserBotRelation } from './user-bot-relation.model';
import * as fromStore from 'src/app/store';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bot-isvirtual',
  templateUrl: './bot-isvirtual.component.html',
  styleUrls: ['./bot-isvirtual.component.scss']
})
export class BotIsVirtualComponent implements  OnInit {
  @Input() set formModel(formModel: BotDetail) {
    this._formModel = Object.assign({}, formModel);
  }
  @Input() public hideSubmit = true;
  @Input() public marketReadonly = false;

  @Output() public userBotRelationEvent = new EventEmitter<UserBotRelation>();

  allMarkets$ = this.store.select(fromStore.BotSelectors.getAllMarkets);
  brokerMarkets$ = this.store.select(fromStore.BotSelectors.getBrokerMarkets);
  accessPoints$ : Observable<AccessPointDetail[]> = this.store.select(fromStore.BotSelectors.getAccessPoints);;
  bots$: Observable<BotDetail[]> = this.store.select(fromStore.BotSelectors.getUserVirtualBots);
  subscriptionPackage$: Observable<SubscriptionPackage> = this.store.select(fromStore.BotSelectors.getSubscriptionPackage);

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
      defaultTransactionAmount: 1,
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
      maxSellTransactionsByFrame: 0,
      quickReversal: false,
      superReversal: false
  };
  error : string;

  constructor(
    public toastr: ToastrService,
    private service: BotDetailService, 
    public store: Store<fromStore.BotState>,
  ) { }

  ngOnInit() {
      this.store.dispatch(fromStore.BotActions.loadAccessPoints());
      this.store.dispatch(fromStore.BotActions.loadAllMarkets());
      this.store.dispatch(fromStore.BotActions.loadBrokerMarkets({ brokerId: this._formModel.brokerId }));
    }

  onAPChange(accessPoint: AccessPointDetail) {
    this._formModel.brokerId = accessPoint.brokerId;
    this.store.dispatch(fromStore.BotActions.loadBrokerMarkets({ brokerId: this._formModel.brokerId }));
  }

  onSubmit() {
    this.error = null;
    this.bots$
    .pipe(
      withLatestFrom(this.subscriptionPackage$),
      switchMap(([bots, subscriptionPackage]) => {
        if (!bots || bots.length >= subscriptionPackage.maxAllowedBots) {
          return of(false);
        }
        return of(true);
      })
    )
    .subscribe((result) => {
      if(result) {
        const userBotRelation:UserBotRelation = {
          userId: null,
          botId: this._formModel.id ? this._formModel.id : this._formModel.botId ? this._formModel.botId : "",
          accessPointId: this._formModel.accessPointId ? this._formModel.accessPointId : "",
          equityId: this._formModel.equityId ? this._formModel.equityId : "",
          isVirtual: this._formModel.isVirtual ? true : false,
          defaultTransactionAmount: this._formModel.defaultTransactionAmount ? this._formModel.defaultTransactionAmount : 0
      };
  
      this.service.createUserBotRelation(userBotRelation)
          .subscribe(res => {
            this.addUserBotRelation(res as UserBotRelation);
          },
          err => {
            console.log(err);
            this.error = err.error;
          }
      );
      } else {
        this.toastr.warning('You\'ve reached your max allowed bot count.', 'Active bots');
      }
    });
  }

  addUserBotRelation(userBotRelation: UserBotRelation) {
    this.userBotRelationEvent.emit(userBotRelation);
  }
}
