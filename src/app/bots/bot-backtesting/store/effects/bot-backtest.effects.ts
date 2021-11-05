import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { forkJoin, of } from "rxjs";
import { catchError, concatMap, filter, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { BotDetailService } from "src/app/services/bot-detail.service";
import { StrategyDataService } from "src/app/services/strategy-data.service";
import { TransactionDetailService } from "src/app/services/transaction-detail.service";
import { UserService } from "src/app/services/user.service";
import { BotBacktestActions, BotBacktestAPIActions } from "../actions";
import { BotBacktestState } from "../reducers/bot-backtest.reducer";
import * as fromStore from 'src/app/bots/bot-backtesting/store';
import { TradingViewChartService } from "src/app/services/tradingviewchart.service";
import { LineDataUnit } from "src/app/plot/tradingviewchart/linedataunit.model";

@Injectable()
export class BotBacktestEffects {

    loadCurrentBot$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotBacktestActions.loadCurrentBot),
                mergeMap((action) => this.botService.getBotParameters(action.id).pipe(
                    map((currentBot) => BotBacktestAPIActions.loadCurrentBotSuccess({ currentBot })),
                    catchError((error) => of(BotBacktestAPIActions.loadCurrentBotFailure({ error })))
                ))
            );
    });

    loadCurrentBotId$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotBacktestActions.loadCurrentBotId),
                mergeMap((action) => of(action).pipe(
                    map((action) => BotBacktestAPIActions.loadCurrentBotIdSuccess({ id: action.id })),
                    catchError((error) => of(BotBacktestAPIActions.loadCurrentBotIdFailure({ error })))
                ))
            );
    });
    
    loadCurrentBotProfit$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotBacktestActions.loadCurrentBotProfit),
                concatMap((action) => of(action).pipe(withLatestFrom(this.store.select(fromStore.BotBacktestSelectors.getCurrentBotId)))),
                mergeMap(([, botId]) => this.botService.getBotProfit(botId).pipe(
                    map((botProfitSettings) => {
                        return BotBacktestAPIActions.loadCurrentBotProfitSuccess({ botProfitSettings });
                    }),
                    catchError((error) => of(BotBacktestAPIActions.loadCurrentBotProfitFailure({ error })))
                ))
            );
    });

    loadCurrentBotProfitData$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotBacktestActions.loadCurrentBotProfitData),
                concatMap((action) => of(action).pipe(
                    withLatestFrom(
                        this.store.select(fromStore.BotBacktestSelectors.getCurrentBotId),
                        this.store.select(fromStore.BotBacktestSelectors.getCurrentBotFrom),
                        this.store.select(fromStore.BotBacktestSelectors.getCurrentBotTo)          
                    ))),
                mergeMap(([, botId, from, to]) => {
                    return this.botService.getBotProfitPlot(botId, from, to).pipe(
                        map((botProfitData) => BotBacktestAPIActions.loadCurrentBotProfitDataSuccess({ botProfitData })),
                        catchError((error) => of(BotBacktestAPIActions.loadCurrentBotProfitDataFailure({ error })))
                    );
                })
            );
    });

    loadCurrentBotPrices$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotBacktestActions.loadCurrentBotPrices),
                concatMap((action) => of(action)
                    .pipe(
                        withLatestFrom(
                            this.store.select(fromStore.BotBacktestSelectors.getCurrentBot)
                        )
                    )
                ),
                mergeMap(([action, botParameters]) => {
                    return forkJoin([
                        this.candleService.getCandlesFromTo(botParameters.market, botParameters.timeFrame , action.from, action.to),
                        this.candleService.getIndicatorPointsFromTo(botParameters.botId, botParameters.timeFrame, action.from, action.to)
                    ])
                    .pipe(
                        map(([timeSeriesData, indicatorSeriesDataApi]) => {
                            const indicatorSeriesData: {
                                list: LineDataUnit[];
                                name: string;
                            }[] = [];
                            
                            indicatorSeriesDataApi?.forEach((pair) => {
                              const list = { list: pair.value.map(point => new LineDataUnit(point)), name: pair.key };
                              indicatorSeriesData.push(list);
                            });
                            return BotBacktestAPIActions.loadCurrentBotPricesSuccess({ timeSeriesData, indicatorSeriesData, reloadData: action.reloadData });
                        }),
                        catchError((error) => {
                            return of(BotBacktestAPIActions.loadCurrentBotPricesFailure({ error }));
                        })
                    );
                })
            );
    });

    loadCurrentBotSettings$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotBacktestActions.loadCurrentBotSettings),
                concatMap((action) => of(action).pipe(withLatestFrom(this.store.select(fromStore.BotBacktestSelectors.getCurrentBotId)))),
                mergeMap(([, botId]) => this.botService.getBotSettings(botId).pipe(
                    map((botSettings) => BotBacktestAPIActions.loadCurrentBotSettingsSuccess({ botSettings })),
                    catchError((error) => of(BotBacktestAPIActions.loadCurrentBotSettingsFailure({ error })))
                ))
            );
    });

    loadCurrentBotActiveTrades$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotBacktestActions.loadCurrentBotActiveTrades),
                concatMap((action) => of(action).pipe(withLatestFrom(
                    this.store.select(fromStore.BotBacktestSelectors.getCurrentBotId),
                    this.store.select(fromStore.BotBacktestSelectors.getCurrentBotFrom),
                    this.store.select(fromStore.BotBacktestSelectors.getCurrentBotTo),
                ))),
                mergeMap(([, botId, from, to]) => this.transactionService.getActiveBacktesterTransactionsFromTo(botId, from, to).pipe(
                    map((activeTrades) => {
                        activeTrades.sort((a, b) => {
                            if(a.timestamp < b.timestamp) {
                                return 1;
                            }
                            else if(a.timestamp > b.timestamp) {
                                return -1;
                            }
                            return 0;
                        });
                        return BotBacktestAPIActions.loadCurrentBotActiveTradesSuccess({ activeTrades });
                    }),
                    catchError((error) => of(BotBacktestAPIActions.loadCurrentBotActiveTradesFailure({ error })))
                ))
            );
    });

    loadCurrentBotHistoryTrades$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotBacktestActions.loadCurrentBotHistoryTrades),
                concatMap((action) => of(action).pipe(withLatestFrom(
                    this.store.select(fromStore.BotBacktestSelectors.getCurrentBotId),
                    this.store.select(fromStore.BotBacktestSelectors.getCurrentBotFrom),
                    this.store.select(fromStore.BotBacktestSelectors.getCurrentBotTo),
                ))),
                mergeMap(([, botId, from, to]) => this.transactionService.getTradeHistoryBacktesterTransactionsFromTo(botId, from, to).pipe(
                    map((historyTrades) => {
                        historyTrades.sort((a, b) => {
                            if(a.timestamp < b.timestamp) {
                                return 1;
                            }
                            else if(a.timestamp > b.timestamp) {
                                return -1;
                            }
                            return 0;
                        });
                        return BotBacktestAPIActions.loadCurrentBotHistoryTradesSuccess({ historyTrades, from, to })
                    }),
                    catchError((error) => of(BotBacktestAPIActions.loadCurrentBotHistoryTradesFailure({ error })))
                ))
            );
    });

    constructor(
        private actions$: Actions,
        public store: Store<BotBacktestState>,
        private toastr: ToastrService,
        public userService: UserService,
        public botService: BotDetailService,
        public strategyService: StrategyDataService,
        public transactionService: TransactionDetailService,
        public candleService: TradingViewChartService,
    ) {

    }
}