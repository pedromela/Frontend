import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccessPointDetailService } from './accesspoint-detail.service';
import { AccessPointDetail } from './accesspoint-detail.model';
import { NgForm } from '@angular/forms';
import { BrokerDetail } from 'src/app/broker/broker-detail.model';
import * as fromStore from 'src/app/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-accesspoint-edit',
  templateUrl: './accesspoint-edit.component.html',
  styles: []
})
export class AccessPointEditComponent implements  OnInit { 
    data: Params;
    @Input() formModel : AccessPointDetail = {
      id: "",
      name: "",
      account: "",
      userId: "",
      publicKey: "",
      privateKey: "",
      bearerToken : "",
      brokerId: -1
  };
  brokers$: Observable<BrokerDetail[]> = this.store.select(fromStore.BotSelectors.getAllBrokers).pipe(
    tap((brokers) => {
      this.service.getAccessPoint(this.data.id).subscribe(
        res => {
          this.formModel = res as AccessPointDetail;
          this.selectedBroker = brokers.find(broker => broker.id == this.formModel.brokerId);
        },
        err => {
          console.log(err);
        },
      );
  
    })
  );
  selectedBroker: BrokerDetail;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public service: AccessPointDetailService,
    private toastr: ToastrService,
    public store: Store<fromStore.BotState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(fromStore.BotActions.loadAllBrokers());
    this.data = this.route.snapshot.params;
  }

  onSubmit(form: NgForm) {
    this.service.editAccessPoint(this.formModel).subscribe(
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
