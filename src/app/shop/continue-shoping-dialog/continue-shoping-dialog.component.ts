import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-continue-shoping-dialog',
  templateUrl: './continue-shoping-dialog.component.html',
  styleUrls: ['./continue-shoping-dialog.component.css']
})
export class ContinueShopingDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<ContinueShopingDialogComponent>,

  ) { }

}
