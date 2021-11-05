import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { BotDetailService } from "src/app/services/bot-detail.service";
import { BotDetail } from "../bot-detail-list/bot-detail.model";
import { BotIsVirtualComponent } from "../bot-detail-list/bot-isvirtual.component";
import { UserBotRelation } from "../bot-detail-list/user-bot-relation.model";
import { BotRanking } from "./bot-ranking.model";
import * as fromStore from 'src/app/store';
import { SubscriptionPackage } from "src/app/shared/models/subscription-package.model";
import { switchMap, withLatestFrom } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";


@Component({
    selector: 'app-bot-ranking-dialog',
    templateUrl: 'bot-ranking-dialog.component.html',
  })
  export class BotRankingDialogComponent implements OnInit {
    @ViewChild(BotIsVirtualComponent) isVirtualChild: BotIsVirtualComponent;
    bots$: Observable<BotDetail[]> = this.store.select(fromStore.BotSelectors.getUserVirtualBots);
    subscriptionPackage$: Observable<SubscriptionPackage> = this.store.select(fromStore.BotSelectors.getSubscriptionPackage);

    constructor(
      public toastr: ToastrService,
      public store: Store<fromStore.BotState>,
      public dialogRef: MatDialogRef<BotRankingDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: BotRanking,
      private service: BotDetailService
    ) { }
  
    ngOnInit() {
    }

    onSubmit(form: NgForm) {
      this.bots$
      .pipe(
        withLatestFrom(this.subscriptionPackage$),
        switchMap(([bots, subscriptionPackage]) => {
          if (!bots || bots.length >= subscriptionPackage.maxAllowedBots) {
            return of(false);
          }
          return of(true);
        })
      )
      .subscribe((result) => {
        if(result) {
          const userBotRelation:UserBotRelation = {
            userId: null,
            botId: this.data.botParameters.id,
            accessPointId: this.isVirtualChild.formModel.accessPointId,
            equityId: this.isVirtualChild.formModel.equityId,
            isVirtual: this.isVirtualChild.formModel.isVirtual,
            defaultTransactionAmount: this.isVirtualChild.formModel.defaultTransactionAmount
          };

          this.service.createUserBotRelation(userBotRelation)
              .subscribe(res => {
              console.log(res);
              },
              err => {
                  console.log(err);
              }
          );
        } else {
          this.toastr.warning('You\'ve reached your max allowed bot count.', 'Active bots');
        }
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }