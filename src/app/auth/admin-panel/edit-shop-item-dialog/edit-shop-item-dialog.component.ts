import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from '../../users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShopItem } from 'src/app/shop/shop-item.model';
import { NgForm } from '@angular/forms';
import { ShopService } from 'src/app/shop/shop.service';
import { ConfirmDialogComponent } from '../../profile/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-shop-item-dialog',
  templateUrl: './edit-shop-item-dialog.component.html',
  styleUrls: ['./edit-shop-item-dialog.component.css']
})
export class EditShopItemDialogComponent implements OnInit {


  itemForEdit!: ShopItem;


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private shopService: ShopService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.itemForEdit = this.data.item;
  }

  deleteItem() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this item?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.shopService.deleteShopItem(this.itemForEdit.id);
      }
    });
  }


  finishEditing(form: NgForm) {
    this.itemForEdit.name = form.value.name;
    this.itemForEdit.price = form.value.price;

    this.shopService.editShopItem(this.itemForEdit);
    this.snackBar.open("Item edited successfully!", "Close", { duration: 2000 });


  }




}
