import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { URLS } from 'src/app/services/urls.base';
import { BotDetail } from '../bots/bot-detail-list/bot-detail.model';
import { UserBotRelation } from '../bots/bot-detail-list/user-bot-relation.model';
import { BotRanking } from '../bots/bot-ranking/bot-ranking.model';
import { Observable, of } from 'rxjs';
import { BotProfit } from '../bots/bot-detail-list/bot-profit.model';
import { catchError, retryWhen } from 'rxjs/operators';
import { genericRetryStrategy } from './genericRetryStrategy';

@Injectable({
  providedIn: 'root'
})
export class BotDetailService {
  readonly rootURL = URLS.botapiURL;
  //readonly rootURL = 'http://localhost:10000/api';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  modify(formData: BotDetail) {
    return this.http.post(this.rootURL + '/BotParameters', formData);
  }
  create(formData: BotDetail) {
    return this.http.post(this.rootURL + '/BotParameters', formData);
  }
  createUserBotRelation(userBotRelation: UserBotRelation) {
    return this.http.post(this.rootURL + '/UserBotRelations', userBotRelation);
  }

  deleteUserBotRelation(botId: string) {
    return this.http.get(this.rootURL + '/UserBotRelations/delete/' + botId);
  }

  deleteBotDetail(id) {
    return this.http.delete(this.rootURL + '/BotParameters/'+ id);
  }

  getBotParameters(botId): Observable<BotDetail> {
    return this.http.get<BotDetail>(this.rootURL + '/BotParameters/' + botId)
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }
  
  getBotSettings(botId): Observable<string[][]> {
    return this.http.get<string[][]>(this.rootURL + '/BotParameters/settings/' + botId)
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

  getBotProfit(botId): Observable<string[][]> {
    return this.http.get<string[][]>(this.rootURL + '/BotParameters/profit/' + botId)
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

  getBotProfitPlot(botId: string, from: Date, to: Date): Observable<BotProfit[]> {
    return this.http.get<BotProfit[]>(
      this.rootURL +
      '/Profits/' +
      botId + '/' +
      from.toISOString() + '/' +
      to.toISOString()
    ).pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

  getSelfBotParameters(isVirtual: boolean): Observable<BotDetail[]> {
    const url = this.rootURL + '/BotParameters/self/?isvirtual='+isVirtual;
    return this.http.get<BotDetail[]>(url)
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

  public sortByDateAsc(t1:BotRanking, t2:BotRanking): number {
    if(t1.rank > t2.rank) {
      return 1;
    } else if(t1.rank === t2.rank) {
      return 0;
    } else {
      return -1;
    }
  }

  getRankingList(): Observable<BotRanking[]> {
    return this.http.get<BotRanking[]>(this.rootURL + '/BotParameters/ranking')
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }

}
