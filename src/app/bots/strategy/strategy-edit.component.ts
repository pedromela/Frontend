import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { StrategyData } from './strategy-data.model';
import { StrategyDataService } from 'src/app/services/strategy-data.service';

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

  constructor(
    public router: Router, 
    private service: StrategyDataService
  ) { }

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
