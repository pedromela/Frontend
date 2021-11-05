import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PlotComponent } from './plot.component';
import { TradingViewChartComponent } from './tradingviewchart/tradingviewchart.component';
import { TradingViewChartIndicatorComponent } from './tradingviewchart/Tradingviewchart-indicator.component';


@NgModule({
  declarations: [
    PlotComponent,
    TradingViewChartComponent,
    TradingViewChartIndicatorComponent
  ],
  exports: [
    PlotComponent,
    TradingViewChartComponent,
    TradingViewChartIndicatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    NgApexchartsModule
  ],
  providers: []
})
export class PlotModule { }