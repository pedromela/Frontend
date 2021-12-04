import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BotRankingDialogComponent } from './bot-ranking-dialog.component';
import { BotRankingListComponent } from './bot-ranking-list.component';
import { BotRankingComponent } from './bot-ranking.component';
import { BotDetailModule } from '../bot-detail-list/bot-detail.module';
import { BotWizardModule } from '../wizard/bot-wizard.module';
import { BotRankingRoutingModule } from './bot-ranking-routing.module';

@NgModule({
    declarations: [
      BotRankingComponent,
      BotRankingListComponent,
      BotRankingDialogComponent
    ],
    exports: [
      BotRankingComponent,
      BotRankingListComponent,
      BotRankingDialogComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      BotRankingRoutingModule,
      MaterialModule,
      ReactiveFormsModule,
      FormsModule,
      MaterialModule,
      SharedModule,
      BotDetailModule,
      BotWizardModule
    ],
    providers: []
})
export class BotRankingModule { }