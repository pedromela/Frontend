import { AccessPointDetailService } from './accesspoint-detail.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SideNavComponent } from 'src/app/shared/components/sidenav.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { BotState } from 'src/app/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-accesspoint-detail',
  templateUrl: './accesspoint-detail.component.html',
  styles: []
})
export class AccessPointDetailComponent extends SideNavComponent implements  OnInit   {
  data: Params;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public router: Router,
    public route: ActivatedRoute,
    public service: AccessPointDetailService,
    public store: Store<BotState>,
  ) {
    super(changeDetectorRef, media, router, store); 
    this.data = this.route.snapshot.params;
  }

  ngOnInit() {
  }


}
