import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth/auth.guard';
import { PermissionGuard } from 'src/app/shared/guards/permission/permission.guard';
import { SubscriptionGuard } from 'src/app/shared/guards/subscription/subscription.guard';
import { StrategyWizardComponent } from './strategy-wizard.component';

const routes: Routes = [
  { 
    path:'',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrategyRoutingModule { }
