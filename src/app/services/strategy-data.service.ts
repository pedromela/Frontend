import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { URLS } from 'src/app/services/urls.base';
import { Observable, of } from 'rxjs';
import { StrategyData } from '../bots/strategy/strategy-data.model';
import { catchError, retryWhen } from 'rxjs/operators';
import { genericRetryStrategy } from './genericRetryStrategy';

@Injectable({
  providedIn: 'root'
})
export class StrategyDataService {
  formData: StrategyData= {
    id: null,
    name: null,
    buyCondition: null,
    sellCondition: null,
    buyCloseCondition: null,
    sellCloseCondition: null
  };
  
  readonly rootURL = URLS.botapiURL;
  //readonly rootURL = 'http://localhost:10000/api';
  loaded: boolean;
  list : StrategyData[];

  constructor(private http: HttpClient, private toastr: ToastrService) { 
    this.list = [];
  }

  post() {
    return this.http.post(this.rootURL + '/conditionstrategydatas', this.formData);
  }
  create(formData: StrategyData) {
    return this.http.post(this.rootURL + '/conditionstrategydatas', formData);
  }
  modify(formData: StrategyData) {
    return this.http.post(this.rootURL + '/conditionstrategydatas', formData);
  }
  put() {
    return this.http.put(this.rootURL + '/conditionstrategydatas/'+ this.formData.id, this.formData);
  }
  delete(id) {
    return this.http.get(this.rootURL + '/conditionstrategydatas/delete/'+ id);
  }

  getGetAllStrategies() : Observable<StrategyData[]>{
    return this.http.get<StrategyData[]>(this.rootURL + '/conditionstrategydatas/self')
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }
  refreshList() {
    var response = this.http.get(this.rootURL + '/conditionstrategydatas/self');

    response
    .toPromise()
    .then(res => { //Success
      this.list = res as StrategyData[];
      this.loaded = true;
    }, msg => { //Error
        console.log(msg);
    })
  }

}
