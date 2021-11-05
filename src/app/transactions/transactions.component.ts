import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BotState } from '../store';
import { TransactionDetailListComponent } from './transaction-detail-list/transaction-detail-list.component';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionsComponent implements AfterViewInit {
  @ViewChild('scrollframe') scrollFrame: ElementRef;
  @ViewChild(TransactionDetailListComponent) child: TransactionDetailListComponent;

  userDetails;
  private scrollContainer: any;
  private isNearBottom = true;
  private lastId = 0;

  constructor(
    public store: Store<BotState>,
  ) { }

  ngAfterViewInit() {

  }
      
  private isUserNearBottom(): boolean {
    const threshold = 0;
    const positon = window.scrollY + window.innerHeight;
    const height = this.scrollContainer.offsetHeight;
    return positon > height - threshold;
  }

  @HostListener('window:scroll', ['$event'])
  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();

    if(this.isNearBottom) {
      this.lastId = this.child.service.refreshList(this.lastId);
      console.log("Is near bottom! LastId: " + this.lastId);
    }
  }

}
