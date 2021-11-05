import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'bot-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
    @Input() loading = false;
    @Input() diameter? = 100;
    
    constructor() { }

    ngOnInit() {

    }
}