import { createReducer, on, Action } from '@ngrx/store';
import { BotDetail } from 'src/app/bots/bot-detail-list/bot-detail.model';
import { BotProfit } from 'src/app/bots/bot-detail-list/bot-profit.model';
import { Candle } from 'src/app/plot/candlechart/candle.model';
import { IndicatorSeries } from 'src/app/plot/tradingviewchart/indicatorseries.model';
import { TransactionDetail } from 'src/app/transactions/transaction-detail-list/transaction-detail.model';

import { BotBacktestActions, BotBacktestAPIActions } from '../actions';

export interface BotBacktestState {
    currentBotLoading: boolean;
    currentBotReloadData: boolean;
    currentBot: BotDetail;
    currentBotFrom: Date;
    currentBotTo: Date;
    currentBotId: string;
    botProfitSettings: string[][];
    botProfitData: BotProfit[];
    botSettings: string[][];
    activeTrades: TransactionDetail[];
    historyTrades: TransactionDetail[];
    activeTradesCount: number;
    historyTradesCount: number;
    priceSeriesData: Candle[];
    indicatorSeriesData: IndicatorSeries[];
    allMarkets: string[];
    error: string;
    navigate: boolean;
}

export const initialState: BotBacktestState = {
    currentBotLoading: false,
    currentBotReloadData: false,
    currentBot: null,
    currentBotId: null,
    currentBotFrom: null,
    currentBotTo: null,
    botProfitSettings: null,
    botProfitData: [],
    botSettings: [],
    activeTrades: [],
    historyTrades: [],
    activeTradesCount: null,
    historyTradesCount: null,
    priceSeriesData: [],
    indicatorSeriesData: null,
    allMarkets: [],
    error: null,
    navigate: false,
};

export const BotBacktestReducer = createReducer(
  initialState,
  on(BotBacktestActions.clear, (state, action): BotBacktestState => {
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
      currentBotLoading: false,
      error: ''
    };
  }),
  on(BotBacktestActions.loadCurrentBot,
    BotBacktestActions.loadCurrentBotId,
    BotBacktestActions.loadCurrentBotSettings,
    BotBacktestActions.loadCurrentBotPrices,
    BotBacktestActions.loadCurrentBotProfit,
    BotBacktestActions.loadCurrentBotProfitData,
    BotBacktestActions.loadCurrentBotActiveTrades,
    BotBacktestActions.loadCurrentBotHistoryTrades, (state): BotBacktestState => {
      return {
        ...state,
        currentBotLoading: true,
        error: ''
      };
  }),
  on(BotBacktestActions.clearCurrentBot, (state, action): BotBacktestState => {
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
      currentBotLoading: false,
      error: ''
    };
  }),
  on(BotBacktestAPIActions.loadCurrentBotSuccess, (state, action): BotBacktestState => {
    return {
      ...state,
      currentBot: action.currentBot,
      currentBotLoading: false,
      error: ''
    };
  }),
  on(BotBacktestAPIActions.loadCurrentBotIdSuccess, (state, action): BotBacktestState => {
    return {
      ...state,
      currentBotId: action.id,
      currentBotLoading: false,
      error: ''
    };
  }),
  on(BotBacktestAPIActions.loadCurrentBotSettingsSuccess, (state, action): BotBacktestState => {
    return {
      ...state,
      botSettings: action.botSettings,
      error: ''
    };
  }),
  on(BotBacktestAPIActions.loadCurrentBotPricesSuccess, (state, action): BotBacktestState => {
    return {
      ...state,
      indicatorSeriesData: action.indicatorSeriesData,
      priceSeriesData: action.timeSeriesData,
      currentBotLoading: false,
      currentBotReloadData: action.reloadData,
      error: ''
    };
  }),
  on(BotBacktestAPIActions.loadCurrentBotProfitSuccess, (state, action): BotBacktestState => {
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
  on(BotBacktestAPIActions.loadCurrentBotProfitDataSuccess, (state, action): BotBacktestState => {
    return {
      ...state,
      botProfitData: action.botProfitData,
      error: ''
    };
  }),  
  on(BotBacktestAPIActions.loadCurrentBotActiveTradesSuccess, (state, action): BotBacktestState => {
    return {
      ...state,
      activeTrades: action.activeTrades,
      error: ''
    };
  }),  
  on(BotBacktestAPIActions.loadCurrentBotHistoryTradesSuccess, (state, action): BotBacktestState => {
    return {
      ...state,
      historyTrades: action.historyTrades,
      error: ''
    };
  }),
  on(BotBacktestActions.setCurrentBotFrom, (state, action): BotBacktestState => {
    return {
      ...state,
      currentBotFrom: action.from,
      error: ''
    };
  }),
  on(BotBacktestActions.setCurrentBotTo, (state, action): BotBacktestState => {
    return {
      ...state,
      currentBotTo: action.to,
      error: ''
    };
  }),
  on(BotBacktestActions.setCurrentBotReloadData, (state, action): BotBacktestState => {
    return {
      ...state,
      currentBotReloadData: action.reloadData,
      error: ''
    };
  }),
  on(BotBacktestAPIActions.loadCurrentBotFailure,
    BotBacktestAPIActions.loadCurrentBotIdFailure,
    BotBacktestAPIActions.loadCurrentBotSettingsFailure,
    BotBacktestAPIActions.loadCurrentBotProfitFailure,
    BotBacktestAPIActions.loadCurrentBotProfitDataFailure,
    BotBacktestAPIActions.loadCurrentBotActiveTradesFailure,
    BotBacktestAPIActions.loadCurrentBotHistoryTradesFailure, (state, action) => {
    return {
      ...state,
      currentBotLoading: false,
      error: action.error
    };
  }),
);