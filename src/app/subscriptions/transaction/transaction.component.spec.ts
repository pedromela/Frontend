import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletTransactionComponent } from './transaction.component';


describe('TransactionComponent', () => {
  let component: WalletTransactionComponent;
  let fixture: ComponentFixture<WalletTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
