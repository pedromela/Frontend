import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { StrategyData } from './strategy-data.model';
import { StrategyDataService } from 'src/app/services/strategy-data.service';
import { Observable } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';

@Component({
  selector: 'app-strategy-edit',
  templateUrl: './strategy-edit.component.html',
  styles: []
})
export class StrategyEditComponent implements OnInit {
  @Output() public strategyDataEvent = new EventEmitter<StrategyData>();

  @Input() formModel : StrategyData  = {
    id: null,
    name: null,
    buyCondition: null,
    sellCondition: null,
    buyCloseCondition: null,
    sellCloseCondition: null
  };
  formGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    secondCtrl: ['', Validators.required],
    thirdCtrl: ['', Validators.required],
    fourthCtrl: ['', Validators.required],
    fifthCtrl: ['', Validators.required],
  });
  isEditable = true;

  get firstCtrl() {
    return this.formGroup.get('firstCtrl') as FormControl;
  }

  get secondCtrl() {
    return this.formGroup.get('secondCtrl') as FormControl;
  }

  get thirdCtrl() {
    return this.formGroup.get('thirdCtrl') as FormControl;
  }

  get fourthCtrl() {
    return this.formGroup.get('fourthCtrl') as FormControl;
  }

  get fifthCtrl() {
    return this.formGroup.get('fifthCtrl') as FormControl;
  }

  constructor(
    private _formBuilder: FormBuilder,
    public router: Router, 
    private service: StrategyDataService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
      if(this.formModel.id) {
        this.service.create(this.formModel).subscribe(
            res => {
                this.formModel = res as StrategyData;
                this.strategyDataEvent.emit(this.formModel);
                this.router.navigateByUrl('/bots');
            },
            err => {
                console.log(err);
            },
        );
      } else {
        this.service.modify(this.formModel).subscribe(
            res => {
                this.formModel = res as StrategyData;
                this.strategyDataEvent.emit(this.formModel);
                this.router.navigateByUrl('/bots');
            },
            err => {
                console.log(err);
            },
        );
      }
  }

}
