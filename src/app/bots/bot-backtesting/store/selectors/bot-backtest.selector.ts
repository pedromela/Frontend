import { createSelector, createFeatureSelector } from "@ngrx/store";
import { BotBacktestState } from "../reducers/bot-backtest.reducer";

export const getFeatureState = createFeatureSelector<BotBacktestState>("botBacktestState");

export const getAllMarkets = createSelector(
    getFeatureState,
    state => state.allMarkets
);

export const getNavigate = createSelector(
    getFeatureState,
    state => state.navigate
);

export const getCurrentBot = createSelector(
    getFeatureState,
    state => state.currentBot
);

export const getCurrentBotId = createSelector(
    getFeatureState,
    state => state.currentBotId
);

export const getCurrentBotFrom = createSelector(
    getFeatureState,
    state => state.currentBotFrom
);

export const getCurrentBotTo = createSelector(
    getFeatureState,
    state => state.currentBotTo
);

export const getCurrentBotProfitSettings = createSelector(
    getFeatureState,
    state => state.botProfitSettings
);

export const getCurrentBotProfitData = createSelector(
    getFeatureState,
    state => state.botProfitData
);

export const getCurrentBotSettings = createSelector(
    getFeatureState,
    state => state.botSettings
);

export const getCurrentBotActiveTrades = createSelector(
    getFeatureState,
    state => state.activeTrades
);

export const getCurrentBotHistoryTrades = createSelector(
    getFeatureState,
    state => state.historyTrades
);

export const getCurrentBotActiveTradesCount = createSelector(
    getFeatureState,
    state => state.activeTradesCount
);

export const getCurrentBotHistoryTradesCount = createSelector(
    getFeatureState,
    state => state.historyTradesCount
);

export const getCurrentBotPriceSeries = createSelector(
    getFeatureState,
    state => state.priceSeriesData
);

export const getCurrentBotIndicatorSeries = createSelector(
    getFeatureState,
    state => state.indicatorSeriesData
);

export const getCurrentBotReloadData = createSelector(
    getFeatureState,
    state => state.currentBotReloadData
);

export const getCurrentBotLoading = createSelector(
    getFeatureState,
    state => state.currentBotLoading
);
