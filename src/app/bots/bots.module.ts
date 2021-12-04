import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BotDetailModule } from './bot-detail-list/bot-detail.module';
import { BotsRoutingModule } from './bots-routing.module';


@NgModule({
    declarations: [
      ],
      exports: [
      ],
      imports: [
        CommonModule,
        RouterModule,
        BotsRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        SharedModule,
        BotDetailModule
      ],
      providers: []
})
export class BotsModule { }