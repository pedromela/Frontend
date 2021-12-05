import { createReducer, on, Action } from '@ngrx/store';
import { BotDetail } from 'src/app/bots/bot-detail-list/bot-detail.model';
import { BotProfit } from 'src/app/bots/bot-detail-list/bot-profit.model';
import { Candle } from 'src/app/plot/candlechart/candle.model';
import { IndicatorSeries } from 'src/app/plot/tradingviewchart/indicatorseries.model';
import { TransactionDetail } from 'src/app/transactions/transaction-detail-list/transaction-detail.model';
import * as signalR from "@aspnet/signalr";

import { BotBacktestActions, BotBacktestAPIActions } from '../actions';
import { BacktestData } from 'src/app/shared/interfaces/chartmodel';

export interface BotBacktestState {
    currentBotLoading: boolean;
    currentBotSettingsLoading: boolean;
    currentBotProfitLoading: boolean;
    currentBotProfitDataLoading: boolean;
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
    backtestData: BacktestData;
    backtesting: boolean;
}

export const initialState: BotBacktestState = {
    currentBotLoading: false,
    currentBotSettingsLoading: false,
    currentBotProfitLoading: false,
    currentBotProfitDataLoading: false,
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
    backtestData: null,
    backtesting: false,
};

export const BotBacktestReducer = createReducer(
  initialState,
  on(BotBacktestActions.clear, (state, action): BotBacktestState => {
    return {
      ...state,
      currentBotLoading: false,
      currentBotSettingsLoading: false,
      currentBotProfitLoading: false,
      currentBotProfitDataLoading: false,
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
      backtestData: null,
      backtesting: false,
    };
  }),
  on(BotBacktestActions.loadCurrentBot,
    BotBacktestActions.loadCurrentBotId,
    BotBacktestActions.loadCurrentBotPrices,
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
  on(BotBacktestActions.nextBacktestData, (state, action): BotBacktestState => {
    return {
      ...state,
      backtestData: action.data,
    };
  }),
  on(BotBacktestActions.loadCurrentBotSettings, (state): BotBacktestState => {
    return {
      ...state,
      currentBotSettingsLoading: true,
      error: ''
    };
  }),
  on(BotBacktestAPIActions.loadCurrentBotSettingsSuccess, (state, action): BotBacktestState => {
    return {
      ...state,
      currentBotSettingsLoading: false,
      botSettings: action.botSettings,
      error: ''
    };
  }),
  on(BotBacktestActions.loadCurrentBotProfit, (state): BotBacktestState => {
    return {
      ...state,
      currentBotProfitLoading: true,
      error: ''
    };
  }),
  on(BotBacktestAPIActions.loadCurrentBotProfitSuccess, (state, action): BotBacktestState => {
    const activeTrades = action.botProfitSettings.find((setting) => setting[0] === 'Active transactions');
    const historyTrades = action.botProfitSettings.find((setting) => setting[0] === 'Positions');
    const activeTradesCount = +activeTrades[1];
    const historyTradesCount = +historyTrades[1];

    return {
      ...state,
      botProfitSettings: action.botProfitSettings,
      activeTradesCount: activeTradesCount,
      historyTradesCount: historyTradesCount,
      currentBotProfitLoading: false,
      error: ''
    };
  }),
  on(BotBacktestAPIActions.loadCurrentBotProfitFailure, (state, action) => {
    return {
      ...state,
      currentBotProfitLoading: false,
      error: action.error
    };
  }),
  on(BotBacktestActions.loadCurrentBotProfitData, (state): BotBacktestState => {
    return {
      ...state,
      currentBotProfitDataLoading: true,
      error: ''
    };
  }),
  on(BotBacktestAPIActions.loadCurrentBotProfitDataSuccess, (state, action): BotBacktestState => {
    return {
      ...state,
      currentBotProfitDataLoading: false,
      botProfitData: action.botProfitData,
      error: ''
    };
  }),
  on(BotBacktestAPIActions.loadCurrentBotProfitDataFailure, (state, action) => {
    return {
      ...state,
      currentBotProfitDataLoading: false,
      error: action.error
    };
  }),
  on(BotBacktestAPIActions.loadCurrentBotSettingsFailure, (state, action) => {
    return {
      ...state,
      currentBotSettingsLoading: false,
      error: action.error
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
  on(BotBacktestAPIActions.startBacktestSuccess, (state, action): BotBacktestState => {
    return {
      ...state,
      backtesting: true,
    };
  }),
  on(BotBacktestAPIActions.stopBacktestSuccess, (state, action): BotBacktestState => {
    return {
      ...state,
      backtesting: false,
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
    BotBacktestAPIActions.loadCurrentBotActiveTradesFailure,
    BotBacktestAPIActions.loadCurrentBotHistoryTradesFailure,
    BotBacktestAPIActions.stopBacktestFailure,
    BotBacktestAPIActions.startBacktestFailure, (state, action) => {
    return {
      ...state,
      currentBotLoading: false,
      error: action.error,
      backtesting: false,
    };
  }),
);