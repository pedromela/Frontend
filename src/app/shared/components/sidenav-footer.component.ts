import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-footer',
  templateUrl: './sidenav-footer.component.html',
  styleUrls: ['./sidenav-footer.component.scss']
})
export class SidenavFooterComponent implements OnInit {

  today: number = Date.now();
  
  constructor() { }

  ngOnInit() {
  }

}
