import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavComponent } from './../shared/components/sidenav.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { BotState } from '../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent extends SideNavComponent implements OnInit {

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public router: Router,
    public store: Store<BotState>,
  ) {
       super(changeDetectorRef, media, router, store);
   }

  ngOnInit() {
  }

}
