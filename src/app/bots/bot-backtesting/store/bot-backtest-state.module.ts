import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { BacktesterSignalRService } from "src/app/services/backtester-signal-r.service";
import { BotBacktestEffects } from "./effects/bot-backtest.effects";
import { BotBacktestReducer } from "./reducers/bot-backtest.reducer";

@NgModule({
    imports: [
        StoreModule.forFeature('botBacktestState', BotBacktestReducer),
        EffectsModule.forFeature([BotBacktestEffects])
    ],
    declarations: [],
    providers: [
        BacktesterSignalRService
    ]
})
export class BotBacktestStateModule { }