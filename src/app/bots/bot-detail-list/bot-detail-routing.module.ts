import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth/auth.guard';
import { SubscriptionGuard } from 'src/app/shared/guards/subscription/subscription.guard';
import { BotDetailComponent } from './bot-detail.component';
import { BotsComponent } from './bots.component';

const routes: Routes = [
  {
    path:'',
    component:BotsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: ':id', 
    component: BotDetailComponent,
    canActivate:[
      AuthGuard,
      SubscriptionGuard
    ],
    data: {
      botId : ':id'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotDetailRoutingModule { }
