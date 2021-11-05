import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'landing-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss']
})
export class WebComponent {
  cards$: Observable<any[]>;
  mainCallOut$: Observable<any>;
  post: any;

  constructor() {
    this.cards$ = of([]);
    this.mainCallOut$ = of([]);
  }
  
}
