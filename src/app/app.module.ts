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

import { BotEngineStartComponent } from './admin/botengine-start.component';
import { CandleChartComponent } from './plot/candlechart/candlechart.component';
import { AdminComponent } from './admin/admin.component';

import { MediaMatcher } from '@angular/cdk/layout';
import { AccessPointsComponent } from './accesspoints/accesspoints.component';
import { AccessPointsCreateComponent } from './accesspoints/acesspoints-detail-list/accesspoint-create.component';
import { AccessPointEditComponent } from './accesspoints/acesspoints-detail-list/accesspoint-edit.component';
import { AcessPointDetailListComponent } from './accesspoints/acesspoints-detail-list/accesspoint-detail-list.component';
import { MaterialModule } from './material-module';
import { AccessPointDetailComponent } from './accesspoints/acesspoints-detail-list/accesspoint-detail.component';
import { UserService } from './services/user.service';

import { BotStateModule } from './store/bot-state.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LandingPageModule } from './welcome/landingpage.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './shared/guards/auth/auth.interceptor';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PlotModule } from './plot/plot.module';
import { BacktesterSignalRService } from './services/backtester-signal-r.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    BotEngineStartComponent,
    CandleChartComponent,
    AdminComponent,
    AccessPointsComponent,
    AccessPointDetailComponent,
    AcessPointDetailListComponent,
    AccessPointsCreateComponent,
    AccessPointEditComponent,
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
    BacktesterSignalRService,
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
