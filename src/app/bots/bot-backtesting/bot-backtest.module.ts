import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material-module';
import { BotBacktestComponent } from './bot-backtest.component';
import { BotBacktestStateModule } from './store/bot-backtest-state.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BotBacktestRoutingModule } from './bot-backtest-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PlotModule } from 'src/app/plot/plot.module';
import { BotBacktestChartComponent } from './bot-backtest-chart.component';
import { BotDetailModule } from '../bot-detail-list/bot-detail.module';


@NgModule({
  declarations: [
    BotBacktestComponent,
    BotBacktestChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    BotBacktestStateModule,
    BotBacktestRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    PlotModule,
    BotDetailModule,
    NgApexchartsModule
  ],
  providers: []
})
export class BotBacktestModule { }