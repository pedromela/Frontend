import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserDetail } from '../user/user-details.model';
import { ToastrService } from 'ngx-toastr';
import { URLS } from '../services/urls.base';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) { }
  //readonly BaseURI = 'http://localhost:5000/api';
  //readonly rootURL = 'http://localhost:10000/api';
  readonly BaseURI = URLS.loginapiURL;
  readonly rootURL = URLS.botapiURL;

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }


  getAdminProfile(userDetails : UserDetail) {
    return this.http.post(this.BaseURI + '/AdminProfile', userDetails);
  }

  startBotEngine() {
    var response = this.http.post(this.rootURL + '/BotParameters/start', null);
    var responseMsg;
    response
    .toPromise()
    .then(res => { //Success
      responseMsg = res;
      if(responseMsg == 'AlreadyRunning') {
        this.toastr.error('Already running!', 'BotEngine');
      }
      else {
        this.toastr.success('Engine in now running!', 'BotEngine');
      }
    }, msg => { //Error
        console.log(msg.error.text);
        console.log(msg);
        responseMsg = msg.error.text;
        if(responseMsg == 'AlreadyRunning') {
          this.toastr.error('Already running!', 'BotEngine');
        }
        else {
          this.toastr.success('Engine in now running!', 'BotEngine');
        }
    })
    return responseMsg;
  }
}
