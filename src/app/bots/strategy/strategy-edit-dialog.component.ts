import { Component, Inject, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StrategyData } from "./strategy-data.model";


@Component({
    selector: 'app-strategy-edit-dialog',
    templateUrl: 'strategy-edit-dialog.component.html',
  })
  export class StrategyEditDialogComponent implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<StrategyEditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: StrategyData) {}
  
    ngOnInit() {
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onSubmit(form: NgForm) {
      this.dialogRef.close();
    }

  }