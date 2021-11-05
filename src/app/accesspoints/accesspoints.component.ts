import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accesspoints',
  templateUrl: './accesspoints.component.html',
  styles: []
})

export class AccessPointsComponent implements OnInit {

  constructor(
    public router: Router,
  ) {
  }

  ngOnInit() {
  }

  newAccessPointClick() {
    this.router.navigateByUrl("accesspoints/create");
  }
}
