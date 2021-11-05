import { Store } from "@ngrx/store";
import { AbstractDataSource } from "src/app/shared/abstract.datasource";
import { BotState } from "src/app/store";
import { BotDetail } from "./bot-detail.model";
import * as fromStore from 'src/app/store';
import { Observable, of } from "rxjs";
import { catchError, filter, map } from "rxjs/operators";

export class BotDataSource extends AbstractDataSource<BotDetail> {
    botDetails$: Observable<BotDetail[]> = this.store.select(fromStore.BotSelectors.getUserBots);

    constructor(public store: Store<BotState>) {
        super();
     }

    load() {
        this.store.dispatch(fromStore.BotActions.loadUserBots());

        this.botDetails$
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