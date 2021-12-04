import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styles: []
})

export class BotsComponent {

  constructor(
    public router: Router,
  ) {
  }

  ngOnInit() {
  }

  newBotClick() {
    this.router.navigateByUrl("botwizard");
  }

  newStrategyClick() {
    this.router.navigateByUrl("strategywizard");
  }
}
