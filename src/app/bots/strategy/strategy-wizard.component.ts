import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { StrategyData } from './strategy-data.model';
import { StrategyDataService } from 'src/app/services/strategy-data.service';

@Component({
  selector: 'app-strategy-wizard',
  templateUrl: './strategy-wizard.component.html',
  styles: []
})
export class StrategyWizardComponent implements OnInit {
  formModel : StrategyData  = {
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
    this.service.create(this.formModel).subscribe(
      res => {
        this.formModel = res as StrategyData;
        this.router.navigateByUrl('/bots');
      },
      err => {
        console.log(err);
      },
    );
  }

}
