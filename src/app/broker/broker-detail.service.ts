import { BrokerDetail } from './broker-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { URLS } from '../services/urls.base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrokerDetailService {
  formData: BrokerDetail= {
    id :0,
    name :"",
    authMode :0,
    brokerType: "",
    marketType: ""
  };
  
  readonly rootURL = URLS.botapiURL;

  list : BrokerDetail[];

  constructor(private http: HttpClient, private toastr: ToastrService) { 
    this.list = [];
  }

  getAllMarkets(): Observable<string[]> {
    return this.http.get<string[]>(this.rootURL + '/Market/all');
  }

  getBrokerMarkets(id): Observable<string[]> {
    return this.http.get<string[]>(this.rootURL + '/Market/' + id);
  }

  getAllBrokerViews(): Observable<BrokerDetail[]> {
    return this.http.get<BrokerDetail[]>(this.rootURL + '/Broker/all');
  }

  getAllBrokerNames(): Observable<string[]> {
    return this.http.get<string[]>(this.rootURL + '/Broker/allnames');
  }
}
