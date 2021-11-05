import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styles: []
})
export class PlotComponent implements OnInit {
  userDetails;

  constructor(public router: Router) {
   }

  ngOnInit() {

  }
}
