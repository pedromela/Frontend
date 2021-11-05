import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageRoutingModule } from './landingpage-routing.module';
import { LandingPageComponent } from './landingpage.component';
import { WebComponent } from './web/web.component';

@NgModule({
  declarations: [
      FooterComponent,
      HeaderComponent,
      LandingPageComponent,
      WebComponent
  ],
  imports: [
    LandingPageRoutingModule
  ],
  providers: [
    DatePipe
  ]
})
export class LandingPageModule { }
