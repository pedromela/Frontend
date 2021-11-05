import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth/auth.guard';
import { PermissionGuard } from 'src/app/shared/guards/permission/permission.guard';
import { SubscriptionGuard } from 'src/app/shared/guards/subscription/subscription.guard';
import { BotBacktestComponent } from './bot-backtest.component';

const routes: Routes = [
  {
    path:':id',
    component: BotBacktestComponent,
    canActivate:[
      AuthGuard,
      SubscriptionGuard,
      PermissionGuard
    ],
    data: {
      botId : ':id',
      permission: 'backtesting'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotBacktestRoutingModule { }
