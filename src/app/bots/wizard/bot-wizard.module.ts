import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BotWizardRoutingModule } from './bot-wizard-routing.module';

import { BotEditComponent } from './bot-edit.component';
import { BotWizardComponent } from './bot-wizard.component';
import { BotIsVirtualComponent } from './bot-isvirtual.component';

@NgModule({
    declarations: [
        BotEditComponent,
        BotWizardComponent,
        BotIsVirtualComponent
      ],
      exports: [
        BotEditComponent,
        BotWizardComponent,
        BotIsVirtualComponent
      ],
      imports: [
        CommonModule,
        BotWizardRoutingModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        SharedModule,
      ],
      providers: []
})
export class BotWizardModule { }