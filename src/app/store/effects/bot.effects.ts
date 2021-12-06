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
import { BotActions, BotAPIActions } from "../actions";
import { BotState } from "../reducers/bot.reducer";
import * as fromStore from 'src/app/store';
import { TradingViewChartService } from "src/app/services/tradingviewchart.service";
import { LineDataUnit } from "src/app/plot/tradingviewchart/linedataunit.model";
import { Router } from "@angular/router";
import { BrokerDetailService } from "src/app/broker/broker-detail.service";
import { AccessPointDetailService } from "src/app/accesspoints/acesspoints-detail-list/accesspoint-detail.service";
import { PaymentService } from "src/app/services/payment.service";
import { SubscriptionPackage } from "src/app/shared/models/subscription-package.model";

@Injectable()
export class BotEffects {

    createUserBotRelation$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.createUserBotRelation),
                mergeMap((action) => {
                    return this.botService.createUserBotRelation(action.userBotRelation).pipe(
                        map(() => {
                            this.toastr.success('Added successfully', 'Bot');
                            return BotAPIActions.createUserBotRelationSuccess();
                        }),
                        catchError((error) => {
                            this.toastr.error('Error adding bot', '');
                            return of(BotAPIActions.createUserBotRelationFailure({ error }));
                        })
                    );   
                })
            );
    });

    createBot$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.createBot),
                mergeMap((action) => {
                    return this.botService.create(action.formData).pipe(
                        map(() => {
                            this.toastr.success('Created successfully', 'Bot');
                            return BotAPIActions.createBotSuccess();
                        }),
                        catchError((error) => {
                            this.toastr.error('Error creating bot', '');
                            return of(BotAPIActions.createBotFailure({ error }));
                        })
                    );   
                })
            );
    });

    modifyBot$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.modifyBot),
                mergeMap((action) => {
                    return this.botService.modify(action.formData).pipe(
                        map(() => {
                            this.toastr.success('Modified successfully', 'Bot');
                            return BotAPIActions.modifyBotSuccess();
                        }),
                        catchError((error) => {
                            this.toastr.error('Error modififying bot', '');
                            return of(BotAPIActions.modifyBotFailure({ error }));
                        })
                    );   
                })
            );
    });

    deleteUserBotRelation$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.deleteUserBotRelation),
                mergeMap((action) => this.botService.deleteUserBotRelation(action.id).pipe(
                    map(() => {
                        this.toastr.success('Removed successfully', 'Bot');
                        return BotAPIActions.deleteUserBotRelationSuccess();
                    }),
                    catchError((error) => {
                        this.toastr.error('Error removing bot', '');
                        return of(BotAPIActions.deleteUserBotRelationFailure({ error }));
                    })
                ))
            );
    });

    deleteStrategy$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.deleteStrategy),
                mergeMap((action) => this.strategyService.delete(action.id).pipe(
                    map(() => {
                        this.toastr.success('Deleted successfully', 'Strategy');
                        return BotAPIActions.deleteStrategySuccess();
                    }),
                    catchError((error) => {
                        this.toastr.error('Error deleting strategy', '');
                        return of(BotAPIActions.deleteStrategyFailure({ error }));
                    })
                ))
            );
    });

    login$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.login),
                mergeMap((action) => this.userService.login(action.formData).pipe(
                    map((res) => {
                        localStorage.setItem('token', res.token);
                        this.router.navigateByUrl('/home');
                        return BotAPIActions.loginSuccess({ token: res.token });
                    }),
                    catchError((error) => {
                        if (error.status == 400)
                            this.toastr.error('Incorrect username or password.', 'Authentication failed.');
                        return of(BotAPIActions.loginFailure({ error }));
                    })
                ))
            );
    });

    register$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.register),
                mergeMap((action) => this.userService.register(action.formData).pipe(
                    map((res) => {
                        if (res.succeeded) {
                            this.toastr.success('New user created!', 'Registration successful.');
                          } else {
                            res.errors.forEach(element => {
                              switch (element.code) {
                                case 'DuplicateUserName':
                                  this.toastr.error('Username is already taken','Registration failed.');
                                  break;
                  
                                default:
                                this.toastr.error(element.description,'Registration failed.');
                                  break;
                              }
                            });
                          }
                        return BotAPIActions.registerSuccess({ token: res.token });
                    }),
                    catchError((error) => {
                        return of(BotAPIActions.registerFailure({ error }));
                    })
                ))
            );
    });

    loadCurrentBot$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadCurrentBot),
                mergeMap((action) => this.botService.getBotParameters(action.id).pipe(
                    map((currentBot) => BotAPIActions.loadCurrentBotSuccess({ currentBot })),
                    catchError((error) => of(BotAPIActions.loadCurrentBotFailure({ error })))
                ))
            );
    });

    loadCurrentBotId$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadCurrentBotId),
                mergeMap((action) => of(action).pipe(
                    map((action) => BotAPIActions.loadCurrentBotIdSuccess({ id: action.id })),
                    catchError((error) => of(BotAPIActions.loadCurrentBotIdFailure({ error })))
                ))
            );
    });
    
    loadCurrentBotProfit$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadCurrentBotProfit),
                concatMap((action) => of(action).pipe(withLatestFrom(this.store.select(fromStore.BotSelectors.getCurrentBotId)))),
                mergeMap(([, botId]) => this.botService.getBotProfit(botId).pipe(
                    map((botProfitSettings) => {
                        return BotAPIActions.loadCurrentBotProfitSuccess({ botProfitSettings });
                    }),
                    catchError((error) => of(BotAPIActions.loadCurrentBotProfitFailure({ error })))
                ))
            );
    });

    loadCurrentBotProfitData$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadCurrentBotProfitData),
                concatMap((action) => of(action).pipe(
                    withLatestFrom(
                        this.store.select(fromStore.BotSelectors.getCurrentBotId),
                        this.store.select(fromStore.BotSelectors.getCurrentBotFrom),
                        this.store.select(fromStore.BotSelectors.getCurrentBotTo)          
                    ))),
                mergeMap(([, botId, from, to]) => {
                    return this.botService.getBotProfitPlot(botId, from, to).pipe(
                        map((botProfitData) => BotAPIActions.loadCurrentBotProfitDataSuccess({ botProfitData })),
                        catchError((error) => of(BotAPIActions.loadCurrentBotProfitDataFailure({ error })))
                    );
                })
            );
    });

    loadCurrentBotPrices$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadCurrentBotPrices),
                concatMap((action) => of(action)
                    .pipe(
                        withLatestFrom(
                            this.store.select(fromStore.BotSelectors.getCurrentBot)
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
                            return BotAPIActions.loadCurrentBotPricesSuccess({ timeSeriesData, indicatorSeriesData, reloadData: action.reloadData });
                        }),
                        catchError((error) => {
                            return of(BotAPIActions.loadCurrentBotPricesFailure({ error }));
                        })
                    );
                })
            );
    });

    loadCurrentBotSettings$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadCurrentBotSettings),
                concatMap((action) => of(action).pipe(withLatestFrom(this.store.select(fromStore.BotSelectors.getCurrentBotId)))),
                mergeMap(([, botId]) => this.botService.getBotSettings(botId).pipe(
                    map((botSettings) => BotAPIActions.loadCurrentBotSettingsSuccess({ botSettings })),
                    catchError((error) => of(BotAPIActions.loadCurrentBotSettingsFailure({ error })))
                ))
            );
    });

    loadCurrentBotActiveTrades$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadCurrentBotActiveTrades),
                concatMap((action) => of(action).pipe(withLatestFrom(
                    this.store.select(fromStore.BotSelectors.getCurrentBotId),
                    this.store.select(fromStore.BotSelectors.getCurrentBotFrom),
                    this.store.select(fromStore.BotSelectors.getCurrentBotTo),
                ))),
                mergeMap(([, botId, from, to]) => {
                    return this.transactionService.getActiveTransactionsFromTo(botId, from, to).pipe(
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
                            return BotAPIActions.loadCurrentBotActiveTradesSuccess({ activeTrades });
                        }),
                        catchError((error) => of(BotAPIActions.loadCurrentBotActiveTradesFailure({ error })))
                    );
                })
            );
    });

    loadCurrentBotHistoryTrades$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadCurrentBotHistoryTrades),
                concatMap((action) => of(action).pipe(withLatestFrom(
                    this.store.select(fromStore.BotSelectors.getCurrentBotId),
                    this.store.select(fromStore.BotSelectors.getCurrentBotFrom),
                    this.store.select(fromStore.BotSelectors.getCurrentBotTo),
                ))),
                mergeMap(([, botId, from, to]) => {
                    return this.transactionService.getTradeHistoryTransactionsFromTo(botId, from, to).pipe(
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
                            return BotAPIActions.loadCurrentBotHistoryTradesSuccess({ historyTrades, from, to })
                        }),
                        catchError((error) => of(BotAPIActions.loadCurrentBotHistoryTradesFailure({ error })))
                    );
                })
            );
    });

    loadUserDetail$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadUserDetails),
                mergeMap(() => forkJoin([
                    this.userService.getUserDetail(),
                    this.paymentService.getSubscriptionPackage()
                ]).pipe(
                    map(([userDetail, isubscriptionPackage]) => {
                        const subscriptionPackage = new SubscriptionPackage(isubscriptionPackage);
                        return BotAPIActions.loadUserDetailSuccess({ userDetail, subscriptionPackage });
                    }),
                    catchError((error) => of(BotAPIActions.loadUserDetailFailure({ error })))
                ))
            );
    });

    loadUserBots$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadUserBots),
                mergeMap(() => this.botService.getSelfBotParameters(false).pipe(
                    map((userBotDetails) => BotAPIActions.loadUserBotsSuccess({ userBotDetails })),
                    catchError((error) => of(error))
                ))
            );
    });

    loadUserVirtualBots$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadUserVirtualBots),
                mergeMap(() => this.botService.getSelfBotParameters(true).pipe(
                    map((userVirtualBotList) => {
                        return BotAPIActions.loadUserVirtualBotsSuccess({ userVirtualBotList });
                    }),
                    catchError((error) => of(BotAPIActions.loadUserVirtualBotsFailure({ error })))
                ))
            );
    });

    loadStrategies$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadStrategies),
                mergeMap(() => this.strategyService.getGetAllStrategies().pipe(
                    map((strategies) => BotAPIActions.loadStrategiesSuccess({ strategies })),
                    catchError((error) => of(BotAPIActions.loadStrategiesFailure({ error })))
                ))
            );
    });

    loadAllBrokers$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadAllBrokers),
                mergeMap(() => this.brokerService.getAllBrokerViews().pipe(
                    map((brokers) => BotAPIActions.loadAllBrokersSuccess({ brokers })),
                    catchError((error) => of(BotAPIActions.loadAllBrokersFailure({ error })))
                ))
            );
    });

    loadAllMarkets$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadAllMarkets),
                mergeMap(() => this.brokerService.getAllMarkets().pipe(
                    map((markets) => BotAPIActions.loadAllMarketsSuccess({ markets })),
                    catchError((error) => of(BotAPIActions.loadAllMarketsFailure({ error })))
                ))
            );
    });

    loadBrokerMarkets$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadBrokerMarkets),
                mergeMap((action) => {
                    return this.brokerService.getBrokerMarkets(action.brokerId)
                    .pipe(
                        map((markets) => BotAPIActions.loadBrokerMarketsSuccess({ markets })),
                        catchError((error) => of(BotAPIActions.loadBrokerMarketsFailure({ error })))
                    );
                })
            );
    });

    loadAccessPoints$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadAccessPoints),
                mergeMap(() => {
                    return this.accessPointService.getAccessPoints()
                    .pipe(
                        map((accessPoints) => BotAPIActions.loadAccessPointsSuccess({ accessPoints })),
                        catchError((error) => of(BotAPIActions.loadAccessPointsFailure({ error })))
                    );
                })
            );
    });

    loadRanking$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BotActions.loadRanking),
                mergeMap(() => this.botService.getRankingList().pipe(
                    map((botRanking) => BotAPIActions.loadRankingSuccess({ botRanking })),
                    catchError((error) => of(BotAPIActions.loadRankingFailure({ error })))
                ))
            );
    });

    constructor(
        private actions$: Actions,
        private router: Router,
        public store: Store<BotState>,
        private toastr: ToastrService,
        public userService: UserService,
        public botService: BotDetailService,
        public strategyService: StrategyDataService,
        public transactionService: TransactionDetailService,
        public candleService: TradingViewChartService,
        private brokerService: BrokerDetailService,
        private accessPointService: AccessPointDetailService,
        private paymentService: PaymentService
    ) {

    }
}