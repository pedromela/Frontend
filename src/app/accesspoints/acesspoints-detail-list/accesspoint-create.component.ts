import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavComponent } from '../../shared/components/sidenav.component';
import { ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AccessPointDetail } from './accesspoint-detail.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AccessPointDetailService } from './accesspoint-detail.service';
import { BrokerDetail } from 'src/app/broker/broker-detail.model';
import { BotState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from 'src/app/store';

@Component({
  selector: 'app-accesspoint',
  templateUrl: './accesspoint-create.component.html',
  styles: []
})

export class AccessPointsCreateComponent extends SideNavComponent implements OnInit {
  formModel : AccessPointDetail = {
      id: "",
      name: "",
      account: "",
      userId: "",
      publicKey: "",
      privateKey: "",
      bearerToken : "",
      brokerId: -1
  };
  brokers$: Observable<BrokerDetail[]> = this.store.select(fromStore.BotSelectors.getAllBrokers);;
  selectedBroker: BrokerDetail;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public router: Router,
    private apservice: AccessPointDetailService,
    private toastr: ToastrService,
    public store: Store<BotState>,
  ) 
  {
    super(changeDetectorRef, media, router, store);
  }

  ngOnInit() {
    this.store.dispatch(fromStore.BotActions.loadAllBrokers());
  }

  onSubmit(form: NgForm) {
    this.formModel.brokerId = this.selectedBroker.id;
    this.apservice.createAccessPoint(this.formModel).subscribe(
      (res: any) => {
        this.router.navigateByUrl("accesspoints")
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Something went wrong.', 'Creation failed.');
        else
          console.log(err);
      }
    );
  }
}
