import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { ShopItem } from 'src/app/shop/shop-item.model';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-add-shop-item-dialog',
  templateUrl: './add-shop-item-dialog.component.html',
  styleUrls: ['./add-shop-item-dialog.component.css']
})
export class AddShopItemDialogComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private shopService: ShopService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddShopItemDialogComponent>,
  ) { }

  values: { [key: string]: any } = {};



  addNewField(form: NgForm) {
    const fieldNames = ['name', 'type', 'price', 'gender', 'size', 'rating', 'manufacturer', 'productionDate', 'date'];

    for (const fieldName of fieldNames) {
      if (form.value.hasOwnProperty(fieldName)) {
        const fieldValue = form.value[fieldName];
        this.values[fieldName] = fieldValue;
      }
    }


  }

  addShopItem() {
    this.shopService.addShopItem(this.values);
    this.dialogRef.close();

  }


}
