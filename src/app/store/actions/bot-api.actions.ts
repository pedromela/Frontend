import { createAction, props } from '@ngrx/store';
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

export const deleteUserBotRelationSuccess = createAction(
  '[Bot API] Delete User Bot Relation Success',
);

export const deleteUserBotRelationFailure = createAction(
    '[Bot API] Delete User Bot Relation Failure',
    props<{ error: string }>()
);

export const deleteStrategySuccess = createAction(
  '[Bot API] Delete Strategy Success',
);

export const deleteStrategyFailure = createAction(
  '[Bot API] Delete Strategy Failure',
  props<{ error: string }>()
);

export const createUserBotRelationSuccess = createAction(
  '[Bot API] Create User Bot Relation Success',
);

export const createUserBotRelationFailure = createAction(
  '[Bot API] Create User Bot Relation Failure',
  props<{ error: string }>()
);

export const createBotSuccess = createAction(
  '[Bot API] Create Bot Success',
);

export const createBotFailure = createAction(
  '[Bot API] Create Bot Failure',
  props<{ error: string }>()
);

export const modifyBotSuccess = createAction(
  '[Bot API] Modify Bot Success',
);

export const modifyBotFailure = createAction(
  '[Bot API] Modify Bot Failure',
  props<{ error: string }>()
);

export const loginSuccess = createAction(
  '[Bot API] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Bot API] Login Failure',
  props<{ error: string }>()
);

export const registerSuccess = createAction(
  '[Bot API] Register Success',
  props<{ token: string }>()
);

export const registerFailure = createAction(
  '[Bot API] Register Failure',
  props<{ error: string }>()
);

export const loadAccessPointsSuccess = createAction(
  '[Bot API] Load Access Points Success',
  props<{ accessPoints: AccessPointDetail[] }>()
);

export const loadAccessPointsFailure = createAction(
  '[Bot API] Load Access Points Failure',
  props<{ error: string }>()
);

export const loadAllBrokersSuccess = createAction(
  '[Bot API] Load All Brokers Success',
  props<{ brokers: BrokerDetail[] }>()
);

export const loadAllBrokersFailure = createAction(
  '[Bot API] Load All Brokers Failure',
  props<{ error: string }>()
);

export const loadAllMarketsSuccess = createAction(
  '[Bot API] Load All Markets Success',
  props<{ markets: string[] }>()
);

export const loadAllMarketsFailure = createAction(
  '[Bot API] Load All Markets Failure',
  props<{ error: string }>()
);

export const loadBrokerMarketsSuccess = createAction(
  '[Bot API] Load Broker Markets Success',
  props<{ markets: string[] }>()
);

export const loadBrokerMarketsFailure = createAction(
  '[Bot API] Load Broker Markets Failure',
  props<{ error: string }>()
);

export const loadCurrentBotSuccess = createAction(
  '[Bot API] Load Current Bot Success',
  props<{ currentBot: BotDetail }>()
);

export const loadCurrentBotFailure = createAction(
  '[Bot API] Load Current Bot Failure',
  props<{ error: string }>()
);

export const loadCurrentBotProfitSuccess = createAction(
  '[Bot API] Load Current Bot Profit Success',
  props<{ botProfitSettings: string[][] }>()
);

export const loadCurrentBotProfitFailure = createAction(
  '[Bot API] Load Current Bot Profit Failure',
  props<{ error: string }>()
);

export const loadCurrentBotProfitDataSuccess = createAction(
  '[Bot API] Load Current Bot Profit Data Success',
  props<{ botProfitData: BotProfit[] }>()
);

export const loadCurrentBotProfitDataFailure = createAction(
  '[Bot API] Load Current Bot Profit Data Failure',
  props<{ error: string }>()
);

export const loadCurrentBotPricesSuccess = createAction(
  '[Bot API] Load Current Bot Profit Prices Success',
  props<{
    timeSeriesData: Candle[],
    indicatorSeriesData: IndicatorSeries[],
    reloadData: boolean
  }>()
);

export const loadCurrentBotPricesFailure = createAction(
  '[Bot API] Load Current Bot Profit Prices Failure',
  props<{ error: string }>()
);

export const loadCurrentBotSettingsSuccess = createAction(
  '[Bot API] Load Current Bot Settings Success',
  props<{ botSettings: string[][] }>()
);

export const loadCurrentBotSettingsFailure = createAction(
  '[Bot API] Load Current Bot Settings Failure',
  props<{ error: string }>()
);

export const loadCurrentBotIdSuccess = createAction(
  '[Bot API] Load Current Bot Id Success',
  props<{ id: string }>()
);

export const loadCurrentBotIdFailure = createAction(
  '[Bot API] Load Current Bot Id Failure',
  props<{ error: string }>()
);

export const loadCurrentBotActiveTradesSuccess = createAction(
  '[Bot API] Load Current Bot Active Trades Success',
  props<{ activeTrades: TransactionDetail[] }>()
);

export const loadCurrentBotActiveTradesFailure = createAction(
  '[Bot API] Load Current Bot Active Trades Failure',
  props<{ error: string }>()
);

export const loadCurrentBotHistoryTradesSuccess = createAction(
  '[Bot API] Load Current Bot History Trades Success',
  props<{
    historyTrades: TransactionDetail[],
    from: Date,
    to: Date
  }>()
);

export const loadCurrentBotHistoryTradesFailure = createAction(
  '[Bot API] Load Current Bot History Trades Failure',
  props<{ error: string }>()
);

export const loadIndicatorDescriptionsSuccess = createAction(
  '[Bot API] Load Current Bot Indicator Descriptions Success',
  props<{ indicatorCompleteDescriptions: IndicatorCompleteDescription[] }>()
);

export const loadIndicatorDescriptionsFailure = createAction(
    '[Bot API] Load Current Bot Indicator Descriptions Failure',
    props<{ error: string }>()
);

export const loadUserBotsSuccess = createAction(
  '[Bot API] Load User Bots Success',
  props<{ userBotDetails: BotDetail[] }>()
);

export const loadUserBotsFailure = createAction(
    '[Bot API] Load User Bots Failure',
    props<{ error: string }>()
);

export const loadUserVirtualBotsSuccess = createAction(
  '[Bot API] Load User Virtual Bots Success',
  props<{ userVirtualBotList: BotDetail[] }>()
);

export const loadUserVirtualBotsFailure = createAction(
    '[Bot API] Load Virtual User Bots Failure',
    props<{ error: string }>()
);

export const loadUserDetailSuccess = createAction(
    '[Bot API] Load User Detail Success',
    props<{ userDetail: UserDetail, subscriptionPackage: SubscriptionPackage }>()
);
  
export const loadUserDetailFailure = createAction(
    '[Bot API] Load User Detail Failure',
    props<{ error: string }>()
);

export const loadStrategiesSuccess = createAction(
  '[Bot API] Load Strategies Success',
  props<{ strategies: StrategyData[] }>()
);

export const loadStrategiesFailure = createAction(
  '[Bot API] Load Strategies Failure',
  props<{ error: string }>()
);

export const loadRankingSuccess = createAction(
  '[Bot API] Load Ranking Success',
  props<{ botRanking: BotRanking[] }>()
);

export const loadRankingFailure = createAction(
  '[Bot API] Load Ranking Failure',
  props<{ error: string }>()
);
