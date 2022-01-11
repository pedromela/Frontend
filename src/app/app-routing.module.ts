import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { PlotComponent } from './plot/plot.component';
import { AdminComponent } from './admin/admin.component';
import { AccessPointsComponent } from './accesspoints/accesspoints.component';
import { AccessPointsCreateComponent } from './accesspoints/acesspoints-detail-list/accesspoint-create.component';
import { AccessPointEditComponent } from './accesspoints/acesspoints-detail-list/accesspoint-edit.component';
import { PageNotFoundComponent } from './shared/components/page-not-found.component';
import { SubscriptionGuard } from './shared/guards/subscription/subscription.guard';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { AdminAuthGuard } from './shared/guards/auth/adminauth.guard';

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
    loadChildren: () => import('./bots//bots.module').then(m => m.BotsModule),
  },
  {
    path:'botwizard',
    loadChildren: () => import('./bots/wizard/bot-wizard.module').then(m => m.BotWizardModule),
  },
  {
    path:'strategywizard',
    loadChildren: () => import('./bots/strategy/strategy.module').then(m => m.StrategyModule),
  },
  {
    path:'ranking',
    loadChildren: () => import('./bots/bot-ranking/bot-ranking.module').then(m => m.BotRankingModule),
  },
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
  {path:'admin',component:AdminComponent,canActivate:[AdminAuthGuard]},
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
