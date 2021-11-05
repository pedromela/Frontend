import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { BotEffects } from "./effects/bot.effects";
import { BotReducer } from "./reducers/bot.reducer";

@NgModule({
    imports: [
        StoreModule.forFeature('botState', BotReducer),
        EffectsModule.forFeature([BotEffects])
    ],
    declarations: [],
    providers: []
})
export class BotStateModule { }