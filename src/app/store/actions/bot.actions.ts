import { FormGroup } from '@angular/forms';
import { createAction, props } from '@ngrx/store';
import { BotDetail } from 'src/app/bots/bot-detail-list/bot-detail.model';
import { UserBotRelation } from 'src/app/bots/bot-detail-list/user-bot-relation.model';

export const clear = createAction(
  '[Bot] Clear',
);

export const clearCurrentBot = createAction(
  '[Bot] Clear Current Bot',
);

export const createUserBotRelation = createAction(
  '[Bot] Create User Bot Relation',
  props<{ userBotRelation: UserBotRelation }>()
);

export const createBot = createAction(
  '[Bot] Create Bot',
  props<{ formData: BotDetail }>()
);

export const modifyBot = createAction(
  '[Bot] Modify Bot',
  props<{ formData: BotDetail }>()
);

export const login = createAction(
  '[Bot] Login',
  props<{ formData: any }>()
);

export const register = createAction(
  '[Bot] Register',
  props<{ formData: FormGroup }>()
);

export const resetNavigate = createAction(
  '[Bot] Reset Navigate',
);

export const loadAllBrokers = createAction(
  '[Bot] Load All Brokers'
)

export const loadAllMarkets = createAction(
  '[Bot] Load All Markets'
)

export const loadAccessPoints = createAction(
  '[Bot] Load Access Points'
)

export const loadBrokerMarkets = createAction(
  '[Bot] Load BrokerMarkets',
  props<{ brokerId: number }>()
)

export const loadCurrentBot = createAction(
  '[Bot] Load Current Bot',
  props<{ id: string }>()
);

export const loadCurrentBotId = createAction(
  '[Bot] Load Current Bot Id',
  props<{ id: string }>()
);

export const loadCurrentBotPrices = createAction(
  '[Bot] Load Current Bot Prices',
  props<{
    from: Date,
    to: Date,
    reloadData: boolean
   }>()
);

export const loadCurrentBotProfit = createAction(
  '[Bot] Load Current Bot Profit',
);

export const loadCurrentBotProfitData = createAction(
  '[Bot] Load Current Bot Profit Data',
  props<{
    from: Date,
    to: Date,
   }>()
);

export const loadCurrentBotSettings = createAction(
  '[Bot] Load Current Bot Settings',
);

export const loadCurrentBotActiveTrades = createAction(
  '[Bot] Load Current Bot Active Trades',
  props<{
    from: Date,
    to: Date,
   }>()
);

export const loadCurrentBotHistoryTrades = createAction(
  '[Bot] Load Current Bot History Trades',
  props<{
    from: Date,
    to: Date,
   }>()
);

export const loadUserDetails = createAction(
  '[Bot] Load User Detail'
);
 
export const loadUserBots = createAction(
  '[Bot] Load User Bots',
);

export const loadUserVirtualBots = createAction(
  '[Bot] Load User Virtual Bots',
);

export const loadStrategies = createAction(
  '[Bot] Load Strategies',
);

export const deleteUserBotRelation = createAction(
  '[Bot] Delete User Bot Relation',
  props<{ id: string }>()
);

export const loadRanking = createAction(
  '[Bot] Load Ranking',
);

export const deleteStrategy = createAction(
  '[Bot] Delete Strategy',
  props<{ id: string }>()
);

export const setCurrentBotFrom = createAction(
  '[Bot] Set Current Bot From',
  props<{ from: Date }>()
);

export const setCurrentBotTo = createAction(
  '[Bot] Set Current Bot To',
  props<{ to: Date }>()
);

export const setCurrentBotReloadData = createAction(
  '[Bot] Set Current Bot ReloadData',
  props<{ reloadData: boolean }>()
);
