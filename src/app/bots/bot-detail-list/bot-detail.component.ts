import { BotDetail } from './bot-detail.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { BotDetailService } from 'src/app/services/bot-detail.service';
import { BotState } from 'src/app/store';
import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/store';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bot-detail',
  templateUrl: './bot-detail.component.html',
  styles: []
})
export class BotDetailComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean> = this.store.select(fromStore.BotSelectors.getLoading).pipe(delay(50));
  botDetail$: Observable<BotDetail> = this.store.select(fromStore.BotSelectors.getCurrentBot);
  data: Params;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public service: BotDetailService,
    public store: Store<BotState>,
  ) { }


  ngOnInit() {
    this.data = this.route.snapshot.params;
    this.store.dispatch(fromStore.BotActions.loadCurrentBot({ id: this.data.id }));
    this.store.dispatch(fromStore.BotActions.loadCurrentBotId({ id: this.data.id }));
  }

  ngOnDestroy() {
    this.store.dispatch(fromStore.BotActions.clearCurrentBot());
  }


}
