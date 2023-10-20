import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShopItem } from 'src/app/shop/shop-item.model';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent {
  amount: number = 1;

  constructor(
    public dialogRef: MatDialogRef<CartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: ShopItem }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddToCart(): void {
    this.dialogRef.close({ item: this.data.item, amount: this.amount });
  }
}