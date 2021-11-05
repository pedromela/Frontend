import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BotDetail } from "./bot-detail.model";


@Component({
    selector: 'app-bot-edit-dialog',
    templateUrl: 'bot-edit-dialog.component.html',
  })
  export class BotEditDialogComponent implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<BotEditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: BotDetail) {}
  
    ngOnInit() {
        console.log(this.data);
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onSubmit(bot: any) {
      this.dialogRef.close();
    }
  
  }