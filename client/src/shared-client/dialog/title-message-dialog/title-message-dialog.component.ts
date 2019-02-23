import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Constants } from '../../../services/constants';

@Component({
  selector: 'title-message-dialog',
  templateUrl: 'title-message-dialog.html',
})
export class TitleMessageDialog {
  constructor(
    public dialogRef: MatDialogRef<TitleMessageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
