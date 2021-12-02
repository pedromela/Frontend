import { createSelector, createFeatureSelector } from "@ngrx/store";
import { BotState } from "./../reducers/bot.reducer";

export const getFeatureState = createFeatureSelector<BotState>("botState");

export const isAdmin = createSelector(
    getFeatureState,
    state => state.userDetail?.userName === 'admin'
);

export const getAllBrokers = createSelector(
    getFeatureState,
    state => state.brokers
);

export const getAllMarkets = createSelector(
    getFeatureState,
    state => state.allMarkets
);

export const getAccessPoints = createSelector(
    getFeatureState,
    state => state.accessPoints
);

export const getBrokerMarkets = createSelector(
    getFeatureState,
    state => state.brokerMarkets
);

export const getNavigate = createSelector(
    getFeatureState,
    state => state.navigate
);

export const getBotRanking = createSelector(
    getFeatureState,
    state => state.botRanking
);

export const getLoadingRanking = createSelector(
    getFeatureState,
    state => state.loadingRanking
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

export const getLoading = createSelector(
    getFeatureState,
    state => state.loading
);

export const getCurrentBotLoading = createSelector(
    getFeatureState,
    state => state.currentBotLoading
);

export const getCurrentBotSettingsLoading = createSelector(
    getFeatureState,
    state => state.currentBotSettingsLoading
);

export const getCurrentBotProfitLoading = createSelector(
    getFeatureState,
    state => state.currentBotProfitLoading
);

export const getCurrentBotProfitDataLoading = createSelector(
    getFeatureState,
    state => state.currentBotProfitDataLoading
);

export const getCurrentBotChartLoading = createSelector(
    getFeatureState,
    state => state.currentBotChartLoading
);

export const getCurrentBotReloadActiveTrades = createSelector(
    getFeatureState,
    state => state.reloadActiveTrades
);

export const getCurrentBotReloadHistoryTrades = createSelector(
    getFeatureState,
    state => state.reloadHistoryTrades
);

export const getCurrentBotActiveTradesLoading = createSelector(
    getFeatureState,
    state => state.currentBotActiveTradesLoading
);

export const getCurrentBotTradeHistoryLoading = createSelector(
    getFeatureState,
    state => state.currentBotTradeHistoryLoading
);

export const getUserBots = createSelector(
    getFeatureState,
    state => state.userBotList
);

export const getUserVirtualBots = createSelector(
    getFeatureState,
    state => state.userVirtualBotList
);

export const getStrategies = createSelector(
    getFeatureState,
    state => state.strategies
);

export const getUserDetail = createSelector(
    getFeatureState,
    state => state.userDetail
);

export const getSubscriptionPackage = createSelector(
    getFeatureState,
    state => state.subscriptionPackage
);

export const getReloadData = createSelector(
    getFeatureState,
    state => state.reloadData
);
