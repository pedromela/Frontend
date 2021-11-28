import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { delay } from "rxjs/operators";
import { BotDetail } from "./bot-detail.model";
import { UserBotRelation } from "./user-bot-relation.model";
import * as fromStore from 'src/app/store';


@Component({
    selector: 'app-bot-edit-subscription-dialog',
    templateUrl: 'bot-edit-subscription-dialog.component.html',
  })
  export class BotEditSubscriptionDialogComponent implements OnInit {
    loading$: Observable<boolean> = this.store.select(fromStore.BotSelectors.getLoading).pipe(delay(50));

    constructor(
      public dialogRef: MatDialogRef<BotEditSubscriptionDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: BotDetail,
      public store: Store<fromStore.BotState>,
    ) { }
  
    ngOnInit() {
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onSubmit(userBotRelation: UserBotRelation) {
      this.dialogRef.close();
      this.store.dispatch(fromStore.BotActions.loadCurrentBotSettings());
    }
  }