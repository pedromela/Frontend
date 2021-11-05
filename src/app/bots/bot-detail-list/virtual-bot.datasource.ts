import { Store } from "@ngrx/store";
import { AbstractDataSource } from "src/app/shared/abstract.datasource";
import { BotState } from "src/app/store";
import { BotDetail } from "./bot-detail.model";
import * as fromStore from 'src/app/store';
import { Observable, of } from "rxjs";
import { catchError, filter, map } from "rxjs/operators";

export class VirtualBotDataSource extends AbstractDataSource<BotDetail> {
    virtualBotDetails$: Observable<BotDetail[]> = this.store.select(fromStore.BotSelectors.getUserVirtualBots);

    constructor(public store: Store<BotState>) {
        super();
     }

    load() {
        this.store.dispatch(fromStore.BotActions.loadUserVirtualBots());

        this.virtualBotDetails$
        .pipe(
            filter((botDetails) => !!botDetails),
            map((botDetails) => {
                this.dataSubject.next(botDetails);
                this.lengthSubject.next(botDetails.length);
            }),
            catchError((error) => of(error))
        )
        .subscribe();
    }
} 