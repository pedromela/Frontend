import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLS } from 'src/app/services/urls.base';
import { IPayment } from '../shared/interfaces/payment';
import { Observable, of } from 'rxjs';
import { ISubscriptionPackage } from '../shared/interfaces/subscription-package';
import { catchError, retryWhen } from 'rxjs/operators';
import { genericRetryStrategy } from './genericRetryStrategy';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  constructor(private http: HttpClient) { }

  public paymentSuccess(payment: IPayment): Observable<Object> {
    return this.http.post(URLS.loginapiURL + '/payments', payment);
  }

  public getSubscriptionPackage(): Observable<ISubscriptionPackage> {
    return this.http.get<ISubscriptionPackage>(URLS.loginapiURL + '/payments/package')
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(error => of(error))
    );
  }
}
