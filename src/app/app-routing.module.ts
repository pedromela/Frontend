import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { BotsComponent } from './bots/bots.component';
import { PlotComponent } from './plot/plot.component';
import { AdminComponent } from './admin/admin.component';
import { BotDetailComponent } from './bots/bot-detail-list/bot-detail.component';
import { BotWizardComponent } from './bots/wizard/bot-wizard.component';
import { AccessPointsComponent } from './accesspoints/accesspoints.component';
import { AccessPointsCreateComponent } from './accesspoints/acesspoints-detail-list/accesspoint-create.component';
import { AccessPointEditComponent } from './accesspoints/acesspoints-detail-list/accesspoint-edit.component';
import { StrategyWizardComponent } from './bots/strategy/strategy-wizard.component';
import { BotRankingComponent } from './bots/bot-ranking/bot-ranking.component';
import { PageNotFoundComponent } from './shared/components/page-not-found.component';
import { SubscriptionGuard } from './shared/guards/subscription/subscription.guard';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { AdminAuthGuard } from './shared/guards/auth/adminauth.guard';
import { PermissionGuard } from './shared/guards/permission/permission.guard';
import { BotBacktestComponent } from './bots/bot-backtesting/bot-backtest.component';

const routes: Routes = [
  //{path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path:'',
    loadChildren: () => import('./welcome/landingpage.module').then(m => m.LandingPageModule)
  },
  {
    path:'subscription',
    loadChildren: () => import('./subscriptions/subscriptions.module').then(m => m.SubscriptionsModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {
    path:'bots',
    component:BotsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'bots/:id', 
    component: BotDetailComponent, 
    canActivate:[
      AuthGuard,
      SubscriptionGuard
    ],
    data: {
      botId : ':id'
    }
  },
  {
    path: 'bots/backtest',
    loadChildren: () => import('./bots/bot-backtesting/bot-backtest.module').then(m => m.BotBacktestModule)
  },
  {
    path:'botwizard',
    component:BotWizardComponent,
    canActivate: [
      AuthGuard,
      SubscriptionGuard,
      PermissionGuard
    ],
    data: {
      permission: 'botCreation'
    }
  },
  { 
    path:'strategywizard',
    component:StrategyWizardComponent,
    canActivate: [
      AuthGuard,
      SubscriptionGuard,
      PermissionGuard
    ],
    data: {
      permission: 'strategyCreation'
    }
  },
  {path:'transactions',component:TransactionsComponent,canActivate:[AuthGuard]},
  {path:'plot/:id',
  component:PlotComponent,
  data: {
    botId : ':id'
  }, 
  canActivate:[AuthGuard]
  },
  {path:'accesspoints',component:AccessPointsComponent,canActivate:[AuthGuard]},
  {path:'accesspoints/create',component:AccessPointsCreateComponent,canActivate:[AuthGuard, SubscriptionGuard]},
  {path: 'accesspoints/:id', 
  component: AccessPointEditComponent, 
    data: {
      accessPointId : ':id'
    }, 
  canActivate:[AuthGuard] },
  {path:'ranking',component:BotRankingComponent,canActivate:[AuthGuard]},
  {path:'admin',component:AdminComponent,canActivate:[AdminAuthGuard]},
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
