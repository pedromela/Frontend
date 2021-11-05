import { Candle } from './candle.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { URLS } from 'src/app/services/urls.base';

@Injectable({
  providedIn: 'root'
})
export class CandleChartService {
  formData: Candle= {
    id :null,
    max: null,
    min: null,
    open: null,
    close: null,
    volume: null,
    volumeQuote: null,
    timestamp: null,
    symbol: null,
    timeFrame: null
  };
  
  //readonly rootURL = 'http://megaladon.ddns.net/BotAPI/api';

  readonly rootURL = URLS.botapiURL;

  list : Candle[];
  auxList : Candle[];

  constructor(private http: HttpClient) { 
    this.list = [];
  }

  postCandleDetail() {
    return this.http.post(this.rootURL + '/Plot', this.formData);
  }
  putCandleDetail() {
    return this.http.put(this.rootURL + '/Plot/'+ this.formData.id, this.formData);
  }
  deleteCandleDetail(id) {
    return this.http.delete(this.rootURL + '/Plot/'+ id);
  }
  getAllCandles() {
    return this.http.get(this.rootURL + '/Plot');

  }
  getSomeCandles(id) {
    return this.http.get(this.rootURL + '/Plot/candle/someProvidedLast/10/' + id);
  }
  getLastCandle() {
    return this.http.get(this.rootURL + '/Plot/candle/last');
  }
  refreshList(id): number{
    console.log("candlechart.service: refreshList() id is " + id);

    var response = this.http.get(this.rootURL + '/Plot/somePairs/100/' + id);

    response
    .toPromise()
    .then(res => { //Success
      this.auxList = res as Candle[];
      this.list.push(...this.auxList);
    }, msg => { //Error
        console.log(msg);
    })

    if(this.auxList == undefined) {
      return 0;
    }

    var last = this.list[this.list.length - 1];
    if(last == undefined) {

      return 0;
    }
    return last.id;
  }
}
