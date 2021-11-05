import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
    templateUrl: 'purchase-subscription-dialog.component.html',
    styleUrls: ['./purchase-subscription-dialog.component.scss']

  })
  export class PurchaseSubscriptionDialogComponent implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<PurchaseSubscriptionDialogComponent>,
      private router: Router
    ) {}
  
    ngOnInit() { }

    onClick(): void {
      this.dialogRef.close();
      this.router.navigate(['/subscription']);
    }
  
  }