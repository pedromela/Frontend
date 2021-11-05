import { AccessPointDetail } from './accesspoint-detail.model';
import { AccessPointDetailService } from './accesspoint-detail.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BotState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from 'src/app/store';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-accesspoint-detail-list',
  templateUrl: './accesspoint-detail-list.component.html',
  styles: []
})

export class AcessPointDetailListComponent implements  OnInit   {
  loading$: Observable<boolean> = this.store.select(fromStore.BotSelectors.getLoading).pipe(delay(50));
  accessPoints$: Observable<AccessPointDetail[]> = this.store.select(fromStore.BotSelectors.getAccessPoints);

  constructor(
    private router: Router,
    public service: AccessPointDetailService,
    private toastr: ToastrService,
    public store: Store<BotState>,
  ) { 

  }

  ngOnInit() {
    this.store.dispatch(fromStore.BotActions.loadAccessPoints());
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteAccessPoint(id)
        .subscribe(res => {
          this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'Access point');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }

  onEdit(id) {
    this.router.navigateByUrl('accesspoints/' + id);
  }

}
