import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./bot-detail-list/bot-detail.module').then(m => m.BotDetailModule)
  },
  {
    path: 'backtest',
    loadChildren: () => import('./bot-backtesting/bot-backtest.module').then(m => m.BotBacktestModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotsRoutingModule { }
