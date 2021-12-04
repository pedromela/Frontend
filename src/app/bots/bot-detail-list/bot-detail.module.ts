import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransactionsModule } from 'src/app/transactions/transactions.module';
import { PlotModule } from 'src/app/plot/plot.module';
import { BotDetailListComponent } from './bot-detail-list.component';
import { BotDetailComponent } from './bot-detail.component';
import { BotEditDialogComponent } from './bot-edit-dialog.component';
import { BotEditSubscriptionDialogComponent } from './bot-edit-subscription-dialog.component';
import { BotProfitComponent } from './bot-profit.component';
import { BotSettingsComponent } from './bot-settings.component';
import { VirtualBotDetailListComponent } from './virtual-bot-detail-list.component';
import { BotWizardModule } from '../wizard/bot-wizard.module';
import { BotsComponent } from './bots.component';
import { StrategyModule } from '../strategy/strategy.module';
import { BotDetailRoutingModule } from './bot-detail-routing.module';

@NgModule({
    declarations: [
        BotsComponent,
        BotDetailListComponent,
        BotDetailComponent,
        BotEditDialogComponent,
        BotEditSubscriptionDialogComponent,
        BotProfitComponent,
        BotSettingsComponent,
        VirtualBotDetailListComponent,
      ],
      exports: [
        BotsComponent,
        BotDetailListComponent,
        BotDetailComponent,
        BotEditDialogComponent,
        BotEditSubscriptionDialogComponent,
        BotProfitComponent,
        BotSettingsComponent,
        VirtualBotDetailListComponent,
      ],
      imports: [
        CommonModule,
        RouterModule,
        BotDetailRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        SharedModule,
        TransactionsModule,
        PlotModule,
        BotWizardModule,
        StrategyModule
      ],
      providers: []
})
export class BotDetailModule { }