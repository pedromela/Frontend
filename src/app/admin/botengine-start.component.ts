import { AdminService } from './admin.service';
import { Component, OnInit } from '@angular/core';
import { UserDetail } from '../user/user-details.model';
import { BotSelectors, BotState } from '../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-botengine-start',
  templateUrl: './botengine-start.component.html',
  styles: []
})
export class BotEngineStartComponent implements OnInit {
    public userDetails : UserDetail;

  constructor(
    private service: AdminService,
    public store: Store<BotState>,
  ) { }

  ngOnInit() {
    this.store.select(BotSelectors.getUserDetail).subscribe(
        res => {
          this.userDetails = res as UserDetail;
        },
        err => {
          console.log(err);
        },
      );
  }

  StartBotEngine() {
    var responseMsg = this.service.startBotEngine();
  }

  isAdmin() {
    if(this.userDetails == undefined) {
      return false;
    }

    return this.userDetails.userName == 'admin'
  }

}
