import { createReducer, on, Action } from '@ngrx/store';
import { AccessPointDetail } from 'src/app/accesspoints/acesspoints-detail-list/accesspoint-detail.model';
import { BotDetail } from 'src/app/bots/bot-detail-list/bot-detail.model';
import { BotProfit } from 'src/app/bots/bot-detail-list/bot-profit.model';
import { BotRanking } from 'src/app/bots/bot-ranking/bot-ranking.model';
import { StrategyData } from 'src/app/bots/strategy/strategy-data.model';
import { BrokerDetail } from 'src/app/broker/broker-detail.model';
import { Candle } from 'src/app/plot/candlechart/candle.model';
import { IndicatorCompleteDescription } from 'src/app/plot/tradingviewchart/indicator-complete-description.model';
import { IndicatorSeries } from 'src/app/plot/tradingviewchart/indicatorseries.model';
import { SubscriptionPackage } from 'src/app/shared/models/subscription-package.model';
import { TransactionDetail } from 'src/app/transactions/transaction-detail-list/transaction-detail.model';
import { UserDetail } from 'src/app/user/user-details.model';

import { BotActions, BotAPIActions } from '../actions';

export interface BotState {
    token: string;
    loading: boolean;
    currentBotLoading: boolean;
    currentBotSettingsLoading: boolean;
    currentBotProfitLoading: boolean;
    currentBotProfitDataLoading: boolean;
    currentBotActiveTradesLoading: boolean;
    currentBotTradeHistoryLoading: boolean;
    currentBotChartLoading: boolean;
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
    loadingRanking: boolean;
    strategies: StrategyData[];
    activeTrades: TransactionDetail[];
    historyTrades: TransactionDetail[];
    activeTradesCount: number;
    historyTradesCount: number;
    reloadActiveTrades: boolean;
    reloadHistoryTrades: boolean;
    priceSeriesData: Candle[];
    indicatorSeriesData: IndicatorSeries[];
    indicatorCompleteDescriptions: IndicatorCompleteDescription[];
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
    currentBotSettingsLoading: false,
    currentBotProfitLoading: false,
    currentBotProfitDataLoading: false,
    currentBotActiveTradesLoading: false,
    currentBotTradeHistoryLoading: false,
    currentBotChartLoading: false,
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
    loadingRanking: false,
    strategies: [],
    activeTrades: [],
    historyTrades: [],
    activeTradesCount: null,
    historyTradesCount: null,
    priceSeriesData: [],
    indicatorSeriesData: null,
    indicatorCompleteDescriptions: null,
    allMarkets: [],
    brokerMarkets: [],
    brokers: [],
    accessPoints: [],
    error: null,
    navigate: false,
    reloadData: false,
    reloadActiveTrades: false,
    reloadHistoryTrades: false
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
  on(BotActions.loadRanking, (state): BotState => {
      return {
        ...state,
        loadingRanking: true,
        error: ''
      };
  }),
  on(BotAPIActions.loadRankingSuccess, (state, action): BotState => {
    return {
      ...state,
      botRanking: action.botRanking,
      loadingRanking: false,
      error: ''
    };
  }),
  on(BotAPIActions.loadRankingFailure, (state, action) => {
    return {
      ...state,
      loadingRanking: false,
      error: action.error
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
  on(BotActions.loadIndicatorDescriptions, (state): BotState => {
    return {
      ...state,
      error: ''
    };
  }), 
  on(BotAPIActions.loadIndicatorDescriptionsSuccess, (state, action): BotState => {
    return {
      ...state,
      indicatorCompleteDescriptions: action.indicatorCompleteDescriptions,
      error: ''
    };
  }),
  on(BotAPIActions.loadIndicatorDescriptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(BotActions.clear, (state, action): BotState => {
    return {
      ...state,
      token: null,
      loading: false,
      currentBotLoading: true,
      currentBotSettingsLoading: false,
      currentBotProfitLoading: false,
      currentBotProfitDataLoading: false,
      currentBotActiveTradesLoading: false,
      currentBotTradeHistoryLoading: false,
      currentBotChartLoading: false,
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
      loadingRanking: false,
      strategies: [],
      activeTrades: [],
      historyTrades: [],
      activeTradesCount: null,
      historyTradesCount: null,
      priceSeriesData: [],
      indicatorSeriesData: null,
      indicatorCompleteDescriptions: null,
      allMarkets: [],
      brokerMarkets: [],
      brokers: [],
      accessPoints: [],
      error: null,
      navigate: false,
      reloadData: false,
      reloadActiveTrades: false,
      reloadHistoryTrades: false
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
    BotActions.loadCurrentBotSettings, (state): BotState => {
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
      currentBotActiveTradesLoading: false,
      currentBotTradeHistoryLoading: false,
      currentBotChartLoading: false,
      currentBotProfitDataLoading: false,
      currentBotProfitLoading: false,
      currentBotSettingsLoading: false,
      currentBotReloadData: false,
      botProfitData: [],
      botSettings: [],
      botProfitSettings: [],
      priceSeriesData: [],
      indicatorSeriesData: [],
      activeTrades: [],
      historyTrades: [],
      historyTradesCount: null,
      reloadHistoryTrades: null,
      reloadActiveTrades: null,
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
  on(BotActions.loadCurrentBotSettings, (state): BotState => {
      return {
        ...state,
        currentBotSettingsLoading: true,
        error: ''
      };
  }),
  on(BotAPIActions.loadCurrentBotSettingsSuccess, (state, action): BotState => {
    return {
      ...state,
      currentBotSettingsLoading: false,
      botSettings: action.botSettings,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotSettingsFailure, (state, action) => {
    return {
      ...state,
      currentBotSettingsLoading: false,
      error: action.error
    };
  }),
  on(BotActions.loadCurrentBotPrices, (state): BotState => {
    return {
      ...state,
      currentBotChartLoading: true,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotPricesSuccess, (state, action): BotState => {
    return {
      ...state,
      indicatorSeriesData: action.indicatorSeriesData,
      priceSeriesData: action.timeSeriesData,
      currentBotLoading: false,
      currentBotChartLoading: false,
      currentBotReloadData: action.reloadData,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotPricesFailure, (state, action) => {
    return {
      ...state,
      currentBotChartLoading: false,
      error: action.error
    };
  }),
  on(BotActions.loadCurrentBotProfit, (state): BotState => {
    return {
      ...state,
      currentBotProfitLoading: true,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotProfitSuccess, (state, action): BotState => {
    const activeTrades = action.botProfitSettings.find((setting) => setting[0] === 'Active trades');
    const historyTrades = action.botProfitSettings.find((setting) => setting[0] === 'Positions');
    const activeTradesCount = +activeTrades[1];
    const historyTradesCount = +historyTrades[1];
    const reloadActiveTrades = activeTradesCount === state.activeTradesCount ? false : true;
    const reloadHistoryTrades = historyTradesCount === state.historyTradesCount ? false : true;

    return {
      ...state,
      botProfitSettings: action.botProfitSettings,
      activeTradesCount: activeTradesCount,
      historyTradesCount: historyTradesCount,
      reloadActiveTrades: reloadActiveTrades,
      reloadHistoryTrades: reloadHistoryTrades,
      currentBotProfitLoading: false,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotProfitFailure, (state, action) => {
    return {
      ...state,
      currentBotProfitLoading: false,
      error: action.error
    };
  }),
  on(BotActions.loadCurrentBotProfitData, (state): BotState => {
    return {
      ...state,
      currentBotProfitDataLoading: true,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotProfitDataSuccess, (state, action): BotState => {
    return {
      ...state,
      currentBotProfitDataLoading: false,
      botProfitData: action.botProfitData,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotProfitDataFailure, (state, action) => {
    return {
      ...state,
      currentBotProfitDataLoading: false,
      error: action.error
    };
  }),
  on(BotActions.loadCurrentBotActiveTrades, (state): BotState => {
    return {
      ...state,
      currentBotActiveTradesLoading: true,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotActiveTradesSuccess, (state, action): BotState => {
    return {
      ...state,
      currentBotActiveTradesLoading: false,
      activeTrades: action.activeTrades,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotActiveTradesFailure, (state, action) => {
    return {
      ...state,
      currentBotActiveTradesLoading: false,
      error: action.error
    };
  }),
  on(BotActions.loadCurrentBotHistoryTrades, (state): BotState => {
    return {
      ...state,
      currentBotTradeHistoryLoading: true,
      error: ''
    };
  }), 
  on(BotAPIActions.loadCurrentBotHistoryTradesSuccess, (state, action): BotState => {
    return {
      ...state,
      currentBotTradeHistoryLoading: false,
      historyTrades: action.historyTrades,
      error: ''
    };
  }),
  on(BotAPIActions.loadCurrentBotActiveTradesFailure, (state, action) => {
    return {
      ...state,
      currentBotTradeHistoryLoading: false,
      error: action.error
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
    BotAPIActions.loadCurrentBotHistoryTradesFailure, (state, action) => {
    return {
      ...state,
      currentBotLoading: false,
      error: action.error
    };
  }),
);