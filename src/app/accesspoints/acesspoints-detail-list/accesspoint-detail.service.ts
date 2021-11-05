import { AccessPointDetail } from './accesspoint-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { URLS } from 'src/app/services/urls.base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessPointDetailService {
  formData: AccessPointDetail= {
    id :"",
    name: "",
    publicKey: "",
    privateKey: "",
    account: "",
    bearerToken: "",
    userId: "",
    brokerId: -1
  };
  
  readonly rootURL = URLS.botapiURL;
  //readonly rootURL = 'http://localhost:10000/api';
  loaded: boolean;
  list : AccessPointDetail[];

  constructor(private http: HttpClient, private toastr: ToastrService) { 
    this.list = [];
  }

  postAccessPoint() {
    return this.http.post(this.rootURL + '/AccessPoints', this.formData);
  }
  createAccessPoint(formData: AccessPointDetail) {
    return this.http.post(this.rootURL + '/AccessPoints', formData);
  }
  deleteAccessPoint(id) {
    return this.http.get(this.rootURL + '/AccessPoints/delete/'+ id);
  }
  editAccessPoint(formData) {
    return this.http.put(this.rootURL + '/AccessPoints/' + formData.id, formData);
  }

  getAccessPoint(id) {
    return this.http.get(this.rootURL + '/AccessPoints/' + id);
  }

  getAccessPoints(): Observable<AccessPointDetail[]> {
    return this.http.get<AccessPointDetail[]>(this.rootURL + '/AccessPoints/self');
  }
  
  refreshList() {
    var response = this.http.get(this.rootURL + '/AccessPoints/self');

    response
    .toPromise()
    .then(res => { //Success
      this.list = res as AccessPointDetail[];
      this.loaded = true;
    }, msg => { //Error
        console.log(msg);
    })
  }

}
