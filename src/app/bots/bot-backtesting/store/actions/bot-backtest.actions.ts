import { createAction, props } from '@ngrx/store';

export const clear = createAction(
  '[Bot Backtest] Clear',
);

export const clearCurrentBot = createAction(
  '[Bot Backtest] Clear Current Bot',
);

export const loadCurrentBot = createAction(
  '[Bot Backtest] Load Current Bot',
  props<{ id: string }>()
);

export const loadCurrentBotId = createAction(
  '[Bot Backtest] Load Current Bot Id',
  props<{ id: string }>()
);

export const loadCurrentBotPrices = createAction(
  '[Bot Backtest] Load Current Bot Prices',
  props<{
    from: Date,
    to: Date,
    reloadData: boolean
   }>()
);

export const loadCurrentBotProfit = createAction(
  '[Bot Backtest] Load Current Bot Profit',
);

export const loadCurrentBotProfitData = createAction(
  '[Bot Backtest] Load Current Bot Profit Data',
  props<{
    from: Date,
    to: Date,
   }>()
);

export const loadCurrentBotSettings = createAction(
  '[Bot Backtest] Load Current Bot Settings',
);

export const loadCurrentBotActiveTrades = createAction(
  '[Bot Backtest] Load Current Bot Active Trades',
  props<{
    from: Date,
    to: Date,
   }>()
);

export const loadCurrentBotHistoryTrades = createAction(
  '[Bot Backtest] Load Current Bot History Trades',
  props<{
    from: Date,
    to: Date,
   }>()
);

export const setCurrentBotFrom = createAction(
  '[Bot Backtest] Set Current Bot From',
  props<{ from: Date }>()
);

export const setCurrentBotTo = createAction(
  '[Bot Backtest] Set Current Bot To',
  props<{ to: Date }>()
);

export const setCurrentBotReloadData = createAction(
  '[Bot Backtest] Set Current Bot ReloadData',
  props<{ reloadData: boolean }>()
);
