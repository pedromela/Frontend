import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BotActions, BotState } from 'src/app/store';
import * as fromStore from 'src/app/store';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loading$: Observable<boolean> = this.store.select(fromStore.BotSelectors.getLoading).pipe(delay(50));
  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(
    public store: Store<BotState>,
    private router: Router,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(BotActions.login({ formData: form.value }));
    //this.store.dispatch(BotActions.loadUserDetails());

  }
}
