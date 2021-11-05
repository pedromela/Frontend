import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLS } from 'src/app/services/urls.base';
import { IPayment } from '../shared/interfaces/payment';
import { Observable } from 'rxjs';
import { ISubscriptionPackage } from '../shared/interfaces/subscription-package';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  constructor(private http: HttpClient) { }

  public paymentSuccess(payment: IPayment): Observable<Object> {
    return this.http.post(URLS.loginapiURL + '/payments', payment);
  }

  public getSubscriptionPackage(): Observable<ISubscriptionPackage> {
    return this.http.get<ISubscriptionPackage>(URLS.loginapiURL + '/payments/package');
  }
}
