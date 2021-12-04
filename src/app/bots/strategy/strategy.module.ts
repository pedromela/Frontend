import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { StrategyWizardComponent } from './strategy-wizard.component';
import { StrategyEditComponent } from './strategy-edit.component';
import { StrategyEditDialogComponent } from './strategy-edit-dialog.component';
import { StrategyDetailListComponent } from './strategy-data-list.component';
import { StrategyDataService } from 'src/app/services/strategy-data.service';
import { StrategyRoutingModule } from './strategy-routing.module';

@NgModule({
    declarations: [
      StrategyDetailListComponent,
      StrategyEditDialogComponent,
      StrategyEditComponent,
      StrategyWizardComponent
    ],
    exports: [
      StrategyDetailListComponent,
      StrategyEditDialogComponent,
      StrategyEditComponent,
      StrategyWizardComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      StrategyRoutingModule,
      MaterialModule,
      ReactiveFormsModule,
      FormsModule,
      MaterialModule,
      SharedModule,
    ],
    providers: [
      StrategyDataService
    ]
})
export class StrategyModule { }