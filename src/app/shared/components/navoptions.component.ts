import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BotActions, BotState } from 'src/app/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navoptions',
  templateUrl: './navoptions.component.html',
  styleUrls: ['./navoptions.component.scss']
})
export class NavOptionsComponent implements OnInit {

  constructor(
    private router: Router,
    public store: Store<BotState>,
  ) { }

  ngOnInit() {
  }

  onLogout() {
    localStorage.removeItem('token');
    this.store.dispatch(BotActions.clear());
    this.router.navigate(['/user/login']);
  }
}
