import { createReducer, on, Action } from '@ngrx/store';
import { AccessPointDetail } from 'src/app/accesspoints/acesspoints-detail-list/accesspoint-detail.model';
import { BotDetail } from 'src/app/bots/bot-detail-list/bot-detail.model';
import { BotProfit } from 'src/app/bots/bot-detail-list/bot-profit.model';
import { BotRanking } from 'src/app/bots/bot-ranking/bot-ranking.model';
import { StrategyData } from 'src/app/bots/strategy/strategy-data.model';
import { BrokerDetail } from 'src/app/broker/broker-detail.model';
import { Candle } from 'src/app/plot/candlechart/candle.model';
import { IndicatorSeries } from 'src/app/plot/tradingviewchart/indicatorseries.model';
import { SubscriptionPackage } from 'src/app/shared/models/subscription-package.model';
import { TransactionDetail } from 'src/app/transactions/transaction-detail-list/transaction-detail.model';
import { UserDetail } from 'src/app/user/user-details.model';

import { BotActions, BotAPIActions } from '../actions';

export interface BotState {
    token: string;
    loading: boolean;
    currentBotLoading: boolean;
    currentBotReloadData: boolean;
    userDetail: UserDetail;
    subscriptionPackage: SubscriptionPackage;
    currentBot: BotDetail;
    currentBotFrom: Date;
    currentBotTo: Date;
    currentBotId: string;
    botProfitSettings: string[][];
    botProfitData: BotProfit[];
    botSettings: string[][];
    userBotList: BotDetail[];
    userVirtualBotList: BotDetail[];
    botRanking: BotRanking[];
    strategies: StrategyData[];
    activeTrades: TransactionDetail[];
    historyTrades: TransactionDetail[];
    activeTradesCount: number;
    historyTradesCount: number;
    priceSeriesData: Candle[];
    indicatorSeriesData: IndicatorSeries[];
    allMarkets: string[];
    brokerMarkets: string[];
    brokers: BrokerDetail[];
    accessPoints: AccessPointDetail[];
    error: string;
    navigate: boolean;
    reloadData: boolean;
}

export const initialState: BotState = {
    token: null,
    loading: false,
    currentBotLoading: true,
    currentBotReloadData: false,
    userDetail: null,
    subscriptionPackage: null,
    currentBot: null,
    currentBotId: null,
    currentBotFrom: null,
    currentBotTo: null,
    botProfitSettings: null,
    botProfitData: [],
    botSettings: [],
    userBotList: [],
    userVirtualBotList: [],
    botRanking: [],
    strategies: [],
    activeTrades: [],
    historyTrades: [],
    activeTradesCount: null,
    historyTradesCount: null,
    priceSeriesData: [],
    indicatorSeriesData: null,
    allMarkets: [],
    brokerMarkets: [],
    brokers: [],
    accessPoints: [],
    error: null,
    navigate: false,
    reloadData: false,
};

export const BotReducer = createReducer(
  initialState,
  on(BotActions.loadUserBots,
    BotActions.login,
    BotActions.loadUserVirtualBots,
    BotActions.loadAccessPoints,
    BotActions.loadAllBrokers,
    BotActions.loadAllMarkets,
    BotActions.loadBrokerMarkets,
    BotActions.loadRanking,
    BotActions.createUserBotRelation,
    BotActions.createBot,
    BotActions.modifyBot,
    BotActions.loadUserDetails, (state): BotState => {
      return {
        ...state,
        loading: true,
        error: ''
      };
  }),  
  on(BotAPIActions.deleteUserBotRelationSuccess, (state, action): BotState => {
    return {
      ...state,
      reloadData: true,
      error: ''
    };
  }),
  on(BotAPIActions.loadAccessPointsSuccess, (state, action): BotState => {
    return {
      ...state,
      accessPoints: action.accessPoints,
      loading: false,
      error: ''
    };
  }),
  on(BotAPIActions.loadAllBrokersSuccess, (state, action): BotState => {
    return {
      ...state,
      brokers: action.brokers,
      loading: false,
      error: ''
    };
  }),
  on(BotAPIActions.loadAllMarketsSuccess, (state, action): BotState => {
    return {
      ...state,
      allMarkets: action.markets,
      loading: false,
      error: ''
    };
  }),
  on(BotAPIActions.loadBrokerMarketsSuccess, (state, action): BotState => {
    return {
      ...state,
      brokerMarkets: action.markets,
      loading: false,
      error: ''
    };
  }),
  on(BotAPIActions.loginSuccess, (state, action): BotState => {
    return {
      ...state,
      token: action.token,
      loading: false,
      error: ''
    };
  }),
  on(BotAPIActions.loadRankingSuccess, (state, action): BotState => {
    return {
      ...state,
      botRanking: action.botRanking,
      loading: false,
      error: ''
    };
  }),
  on(BotActions.resetNavigate, (state, action): BotState => {
    return {
      ...state,
      navigate: false,
    };
  }),
  on(BotAPIActions.modifyBotSuccess,
    BotAPIActions.createBotSuccess,
    BotAPIActions.createUserBotRelationSuccess, (state, action): BotState => {
    return {
      ...state,
      loading: false,
      navigate: true,
      error: ''
    };
  }),
  on(BotAPIActions.loginSuccess, (state, action): BotState => {
    return {
      ...state,
      token: action.token,
      loading: false,
      error: ''
    };
  }),
  on(BotAPIActions.loadUserBotsSuccess, (state, action): BotState => {
      return {
        ...state,
        userBotList: action.userBotDetails,
        loading: false,
        reloadData: false,
        error: ''
      };
  }),
  on(BotAPIActions.loadUserVirtualBotsSuccess, (state, action): BotState => {
    return {
      ...state,
      userVirtualBotList: action.userVirtualBotList,
      loading: false,
      error: ''
    };
  }),
  on(BotAPIActions.loadUserDetailSuccess, (state, action): BotState => {
    return {
      ...state,
      userDetail: action.userDetail,
      subscriptionPackage: action.subscriptionPackage,
      loading: false,
      error: ''
    };
  }),
  on(BotAPIActions.loadStrategiesSuccess, (state, action): BotState => {
    return {
      ...state,
      strategies: action.strategies,
      loading: false,
      error: ''
    };
  }),
  on(BotActions.clear, (state, action): BotState => {
    return {
      ...state,
      currentBot: null,
      currentBotId: null,
      currentBotFrom: null,
      currentBotTo: null,
      botProfitData: [],
      botSettings: [],
      botProfitSettings: [],
      priceSeriesData: [],
      indicatorSeriesData: [],
      activeTrades: [],
      historyTrades: [],
      currentBotLoading: true,
      accessPoints: [],
      userBotList: [],
      userVirtualBotList: [],
      strategies: [],
      error: ''
    };
  }),
  on(BotAPIActions.loadUserBotsFailure,
    BotAPIActions.loginFailure,
    BotAPIActions.loadUserVirtualBotsFailure,
    BotAPIActions.loadStrategiesFailure,
    BotAPIActions.loadAllBrokersFailure,
    BotAPIActions.loadAllMarketsFailure,
    BotAPIActions.loadBrokerMarketsFailure,
    BotAPIActions.loadAccessPointsFailure,
    BotAPIActions.createUserBotRelationFailure,
    BotAPIActions.loadRankingFailure,
    BotAPIActions.createBotFailure,
    BotAPIActions.modifyBotFailure,
    BotAPIActions.loadUserDetailFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    };
  }),
  on(BotActions.loadCurrentBot,
    BotActions.loadCurrentBotId,
    BotActions.loadCurrentBotSettings,
    BotActions.loadCurrentBotPrices,
    BotActions.loadCurrentBotProfit,
    BotActions.loadCurrentBotProfitData,
    BotActions.loadCurrentBotActiveTrades,
    BotActions.loadCurrentBotHistoryTrades, (state): BotState => {
      return {
        ...state,
        currentBotLoading: true,
        error: ''
      };
  }),
  on(BotActions.clearCurrentBot, (state, action): BotState => {
    return {
      ...state,
      currentBot: null,
      currentBotId: null,
      currentBotFrom: null,
      currentBotTo: null,
      botProfitData: [],
      botSettings: [],
      botProfitSettings: [],
      priceSeriesData: [],
      indicatorSeriesData: [],
      activeTrades: [],
      historyTrades: [],
      currentBotLoading: true,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotSuccess, (state, action): BotState => {
    return {
      ...state,
      currentBot: action.currentBot,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotIdSuccess, (state, action): BotState => {
    return {
      ...state,
      currentBotId: action.id,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotSettingsSuccess, (state, action): BotState => {
    return {
      ...state,
      botSettings: action.botSettings,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotPricesSuccess, (state, action): BotState => {
    return {
      ...state,
      indicatorSeriesData: action.indicatorSeriesData,
      priceSeriesData: action.timeSeriesData,
      currentBotLoading: false,
      currentBotReloadData: action.reloadData,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotProfitSuccess, (state, action): BotState => {
    const activeTrades = action.botProfitSettings.find((setting) => setting[0] === 'Active trades');
    const historyTrades = action.botProfitSettings.find((setting) => setting[0] === 'Positions');
    const activeTradesCount = +activeTrades[1];

    const historyTradesCount = +historyTrades[1];
    return {
      ...state,
      botProfitSettings: action.botProfitSettings,
      activeTradesCount: activeTradesCount,
      historyTradesCount: historyTradesCount,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotProfitDataSuccess, (state, action): BotState => {
    return {
      ...state,
      botProfitData: action.botProfitData,
      error: ''
    };
  }),  
  on(BotAPIActions.loadCurrentBotActiveTradesSuccess, (state, action): BotState => {
    return {
      ...state,
      activeTrades: action.activeTrades,
      error: ''
    };
  }),  
  on(BotAPIActions.loadCurrentBotHistoryTradesSuccess, (state, action): BotState => {
    return {
      ...state,
      historyTrades: action.historyTrades,
      error: ''
    };
  }),
  on(BotActions.setCurrentBotFrom, (state, action): BotState => {
    return {
      ...state,
      currentBotFrom: action.from,
      error: ''
    };
  }),
  on(BotActions.setCurrentBotTo, (state, action): BotState => {
    return {
      ...state,
      currentBotTo: action.to,
      error: ''
    };
  }),
  on(BotActions.setCurrentBotReloadData, (state, action): BotState => {
    return {
      ...state,
      currentBotReloadData: action.reloadData,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotFailure,
    BotAPIActions.loadCurrentBotIdFailure,
    BotAPIActions.loadCurrentBotSettingsFailure,
    BotAPIActions.loadCurrentBotProfitFailure,
    BotAPIActions.loadCurrentBotProfitDataFailure,
    BotAPIActions.loadCurrentBotActiveTradesFailure,
    BotAPIActions.loadCurrentBotHistoryTradesFailure, (state, action) => {
    return {
      ...state,
      currentBotLoading: false,
      error: action.error
    };
  }),
);