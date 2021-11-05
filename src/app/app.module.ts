import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { BotsComponent } from './bots/bots.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionDetailListComponent } from './transactions/transaction-detail-list/transaction-detail-list.component';

import { BotDetailListComponent } from './bots/bot-detail-list/bot-detail-list.component';
import { BotEngineStartComponent } from './admin/botengine-start.component';
import { CandleChartComponent } from './plot/candlechart/candlechart.component';
import { AdminComponent } from './admin/admin.component';
import { BotDetailComponent } from './bots/bot-detail-list/bot-detail.component';
import { ActiveTransactionListComponent } from './transactions/transaction-detail-list/active-transactions.component';
import { TradeHistoryComponent } from './transactions/transaction-detail-list/trade-history.component';
import { BotProfitComponent } from './bots/bot-detail-list/bot-profit.component';
import { BotSettingsComponent } from './bots/bot-detail-list/bot-settings.component';
import { BotWizardComponent } from './bots/wizard/bot-wizard.component';

import { MediaMatcher } from '@angular/cdk/layout';
import { AccessPointsComponent } from './accesspoints/accesspoints.component';
import { AccessPointsCreateComponent } from './accesspoints/acesspoints-detail-list/accesspoint-create.component';
import { AccessPointEditComponent } from './accesspoints/acesspoints-detail-list/accesspoint-edit.component';
import { AcessPointDetailListComponent } from './accesspoints/acesspoints-detail-list/accesspoint-detail-list.component';
import { MaterialModule } from './material-module';
import { AccessPointDetailComponent } from './accesspoints/acesspoints-detail-list/accesspoint-detail.component';
import { StrategyDetailListComponent } from './bots/strategy/strategy-data-list.component';
import { StrategyWizardComponent } from './bots/strategy/strategy-wizard.component';
import { BotRankingListComponent } from './bots/bot-ranking/bot-ranking-list.component';
import { BotRankingComponent } from './bots/bot-ranking/bot-ranking.component';
import { BotEditComponent } from './bots/wizard/bot-edit.component';
import { BotEditDialogComponent } from './bots/bot-detail-list/bot-edit-dialog.component';
import { BotRankingDialogComponent } from './bots/bot-ranking/bot-ranking-dialog.component';
import { BotIsVirtualComponent } from './bots/bot-detail-list/bot-isvirtual.component';
import { BotEditSubscriptionDialogComponent } from './bots/bot-detail-list/bot-edit-subscription-dialog.component';
import { StrategyEditDialogComponent } from './bots/strategy/strategy-edit-dialog.component';
import { StrategyEditComponent } from './bots/strategy/strategy-edit.component';
import { VirtualBotDetailListComponent } from './bots/bot-detail-list/virtual-bot-detail-list.component';
import { UserService } from './services/user.service';

import { BotStateModule } from './store/bot-state.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StrategyDataService } from './services/strategy-data.service';
import { LandingPageModule } from './welcome/landingpage.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './shared/guards/auth/auth.interceptor';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PlotModule } from './plot/plot.module';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    BotsComponent,
    TransactionsComponent,
    TransactionDetailListComponent,
    BotDetailListComponent,
    VirtualBotDetailListComponent,
    StrategyDetailListComponent,
    StrategyWizardComponent,
    StrategyEditDialogComponent,
    StrategyEditComponent,
    BotDetailComponent,
    BotEngineStartComponent,
    CandleChartComponent,
    AdminComponent,
    ActiveTransactionListComponent,
    TradeHistoryComponent,
    BotSettingsComponent,
    BotProfitComponent,
    BotWizardComponent,
    AccessPointsComponent,
    AccessPointDetailComponent,
    AcessPointDetailListComponent,
    AccessPointsCreateComponent,
    AccessPointEditComponent,
    BotRankingComponent,
    BotRankingListComponent,
    BotRankingDialogComponent,
    BotEditComponent,
    BotEditDialogComponent,
    BotEditSubscriptionDialogComponent,
    BotIsVirtualComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule,
    MaterialModule,
    BotStateModule,
    LandingPageModule,
    SharedModule,
    PlotModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([])
  ],
  providers: [
    UserService,
    StrategyDataService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MediaMatcher,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
