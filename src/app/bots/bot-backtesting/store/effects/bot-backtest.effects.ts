import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { forkJoin, from, of } from "rxjs";
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
import { BacktesterSignalRService } from "src/app/services/backtester-signal-r.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { URLS } from "src/app/services/urls.base";
import * as signalR from "@aspnet/signalr";
import { ToastrService } from "ngx-toastr";

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
                mergeMap((action) => of(action).pipe(
                    map(() => {
                        const score = action.data;
                        const descriptionDict = {
                            positions: 'Positions',
                            successes: 'Succeses',
                            amountGained: 'Amount gained',
                            activeTransactions: 'Active transactions',
                            maxDrawBack: 'Max Draw Back',
                            currentProfit : 'Current profit',
                        };
                        const data = Object.keys(score).filter((key) => descriptionDict[key] != null).map((key) => {
                            const p = Object.getOwnPropertyDescriptor(score, key);
                            return [descriptionDict[key], p.value];
                        });
                        return BotBacktestAPIActions.loadCurrentBotProfitSuccess({ botProfitSettings: data });
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
                    map((botSettings) => {
                        return BotBacktestAPIActions.loadCurrentBotSettingsSuccess({ botSettings });
                    }),
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

    startBacktest$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotBacktestActions.startBacktest),
                mergeMap((action) => of(this.backtesterSignalRService.startConnection(action.botId, action.from, action.to)).pipe(
                    map((connection) => {
                        return BotBacktestAPIActions.startBacktestSuccess()
                    }),
                    catchError((error) => {
                        return of(BotBacktestAPIActions.startBacktestFailure({ error }));
                    })
                ))
            );
    });

    stopBacktest$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotBacktestActions.stopBacktest),
                mergeMap((action) => of(this.backtesterSignalRService.closeConnection()).pipe(
                    map(() => {
                        return BotBacktestAPIActions.stopBacktestSuccess()
                    }),
                    catchError((error) => of(BotBacktestAPIActions.stopBacktestFailure({ error })))
                ))
            );
    });

    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private actions$: Actions,
        public store: Store<BotBacktestState>,
        public userService: UserService,
        public botService: BotDetailService,
        public strategyService: StrategyDataService,
        public transactionService: TransactionDetailService,
        public candleService: TradingViewChartService,
        public backtesterSignalRService: BacktesterSignalRService,
    ) {

    }
}