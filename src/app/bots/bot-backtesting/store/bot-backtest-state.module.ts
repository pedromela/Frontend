import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { BotBacktestEffects } from "./effects/bot-backtest.effects";
import { BotBacktestReducer } from "./reducers/bot-backtest.reducer";

@NgModule({
    imports: [
        StoreModule.forFeature('botBacktestState', BotBacktestReducer),
        EffectsModule.forFeature([BotBacktestEffects])
    ],
    declarations: [],
    providers: []
})
export class BotBacktestStateModule { }