import { TransactionDetail } from './transaction-detail.model';
import { AfterViewInit, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TransactionDetailService } from 'src/app/services/transaction-detail.service';

@Component({
  selector: 'app-transaction-detail-list',
  templateUrl: './transaction-detail-list.component.html',
  styles: []
})
export class TransactionDetailListComponent implements  AfterViewInit {

  constructor(public service: TransactionDetailService, private toastr: ToastrService) { 

  }

  ngAfterViewInit() {

  }

  populateForm(pd: TransactionDetail) {
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteTransactionDetail(id)
        .subscribe(res => {
          debugger;
          this.service.refreshList(0);
          this.toastr.warning('Deleted successfully', 'Transaction Detail');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }

  colorCondition(pd) {

    if(pd.type == 'buydone') {
      return 'table-info';
    }
    else if(pd.type == 'sell') {
      if(pd.states.includes('WIN')) {
        return 'table-success';
      }
      else if(pd.states.includes('lockedremainingprofit')) {
        return 'table-warning';
      }
      else {
        return 'table-danger'
      }
    }

    return 'table-info';
  }
}
