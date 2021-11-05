import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { URLS } from './urls.base';
import { map } from 'rxjs/operators';
import { UserDetail } from '../user/user-details.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = URLS.loginapiURL;


  register(formGorup: FormGroup): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*'
      })
    };
    var body = {
      UserName: formGorup.value.UserName,
      Email: formGorup.value.Email,
      FullName: formGorup.value.FullName,
      Password: formGorup.value.Passwords.Password
    };
    return this.http.post<any>(this.BaseURI + '/ApplicationUser/Register', body, httpOptions);
  }

  login(formData): Observable<any> {
    return this.http.post<any>(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  getUserDetail() {
    return this.http.get(this.BaseURI + '/UserProfile')
      .pipe(
        map((userDetail) => userDetail as UserDetail)
      );
  }
}
