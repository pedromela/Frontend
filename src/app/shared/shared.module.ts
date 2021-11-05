import { NgModule } from '@angular/core';
import { MaterialModule } from '../material-module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found.component';
import { AdminNavOptionsComponent } from './components/adminnavoptions.component';
import { SideNavComponent } from './components/sidenav.component';
import { LoadingComponent } from './components/loading.component';
import { NavOptionsComponent } from './components/navoptions.component';
import { BrokerPipe } from './pipes/broker.pipe';
import { BrokerTypePipe } from './pipes/broker-type.pipe';
import { PurchaseSubscriptionDialogComponent } from './components/purchase-subscription-dialog.component';
import { SidenavFooterComponent } from './components/sidenav-footer.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    AdminNavOptionsComponent,
    SideNavComponent,
    SidenavFooterComponent,
    LoadingComponent,
    NavOptionsComponent,
    PurchaseSubscriptionDialogComponent,
    BrokerPipe,
    BrokerTypePipe,
  ],
  exports: [
    PageNotFoundComponent,
    AdminNavOptionsComponent,
    SideNavComponent,
    SidenavFooterComponent,
    LoadingComponent,
    NavOptionsComponent,
    PurchaseSubscriptionDialogComponent,
    BrokerPipe,
    BrokerTypePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  providers: []
})
export class SharedModule { }
