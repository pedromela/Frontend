import { createAction, props } from '@ngrx/store';
import { BotDetail } from 'src/app/bots/bot-detail-list/bot-detail.model';
import { BotProfit } from 'src/app/bots/bot-detail-list/bot-profit.model';
import { Candle } from 'src/app/plot/candlechart/candle.model';
import { IndicatorSeries } from 'src/app/plot/tradingviewchart/indicatorseries.model';
import { TransactionDetail } from 'src/app/transactions/transaction-detail-list/transaction-detail.model';

export const loadCurrentBotSuccess = createAction(
  '[Bot Backtest API] Load Current Bot Success',
  props<{ currentBot: BotDetail }>()
);

export const loadCurrentBotFailure = createAction(
  '[Bot Backtest API] Load Current Bot Failure',
  props<{ error: string }>()
);

export const loadCurrentBotProfitSuccess = createAction(
  '[Bot Backtest API] Load Current Bot Profit Success',
  props<{ botProfitSettings: string[][] }>()
);

export const loadCurrentBotProfitFailure = createAction(
  '[Bot Backtest API] Load Current Bot Profit Failure',
  props<{ error: string }>()
);

export const loadCurrentBotProfitDataSuccess = createAction(
  '[Bot Backtest API] Load Current Bot Profit Data Success',
  props<{ botProfitData: BotProfit[] }>()
);

export const loadCurrentBotProfitDataFailure = createAction(
  '[Bot Backtest API] Load Current Bot Profit Data Failure',
  props<{ error: string }>()
);

export const loadCurrentBotPricesSuccess = createAction(
  '[Bot Backtest API] Load Current Bot Profit Prices Success',
  props<{
    timeSeriesData: Candle[],
    indicatorSeriesData: IndicatorSeries[],
    reloadData: boolean
  }>()
);

export const loadCurrentBotPricesFailure = createAction(
  '[Bot Backtest API] Load Current Bot Profit Prices Failure',
  props<{ error: string }>()
);

export const loadCurrentBotSettingsSuccess = createAction(
  '[Bot Backtest API] Load Current Bot Settings Success',
  props<{ botSettings: string[][] }>()
);

export const loadCurrentBotSettingsFailure = createAction(
  '[Bot Backtest API] Load Current Bot Settings Failure',
  props<{ error: string }>()
);

export const loadCurrentBotIdSuccess = createAction(
  '[Bot Backtest API] Load Current Bot Id Success',
  props<{ id: string }>()
);

export const loadCurrentBotIdFailure = createAction(
  '[Bot Backtest API] Load Current Bot Id Failure',
  props<{ error: string }>()
);

export const loadCurrentBotActiveTradesSuccess = createAction(
  '[Bot Backtest API] Load Current Bot Active Trades Success',
  props<{ activeTrades: TransactionDetail[] }>()
);

export const loadCurrentBotActiveTradesFailure = createAction(
  '[Bot Backtest API] Load Current Bot Active Trades Failure',
  props<{ error: string }>()
);

export const loadCurrentBotHistoryTradesSuccess = createAction(
  '[Bot Backtest API] Load Current Bot History Trades Success',
  props<{
    historyTrades: TransactionDetail[],
    from: Date,
    to: Date
  }>()
);

export const loadCurrentBotHistoryTradesFailure = createAction(
  '[Bot Backtest API] Load Current Bot History Trades Failure',
  props<{ error: string }>()
);

export const startBacktestSuccess = createAction(
  '[Bot Backtest API] Start Backtest Success',
);

export const stopBacktestSuccess = createAction(
  '[Bot Backtest API] Stop Backtest Success',
);

export const startBacktestFailure = createAction(
  '[Bot Backtest API] Start Backtest Failure',
  props<{ error: string }>()
);

export const stopBacktestFailure = createAction(
  '[Bot Backtest API] Stop Backtest Failure',
  props<{ error: string }>()
);
