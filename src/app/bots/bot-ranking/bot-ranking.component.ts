import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bot-ranking',
  templateUrl: './bot-ranking.component.html',
  styles: []
})

export class BotRankingComponent implements OnInit {

  constructor(public router: Router) 
  {
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
