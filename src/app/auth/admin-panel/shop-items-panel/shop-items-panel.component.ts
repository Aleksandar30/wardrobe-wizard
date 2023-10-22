import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ShopItem } from 'src/app/shop/shop-item.model';
import { UserService } from '../../users.service';
import { MatDialog } from '@angular/material/dialog';
import { ShopService } from 'src/app/shop/shop.service';
import { ReviewsComponent } from 'src/app/shop/reviews/reviews.component';
import { AddShopItemDialogComponent } from '../add-shop-item-dialog/add-shop-item-dialog.component';
import { EditShopItemDialogComponent } from '../edit-shop-item-dialog/edit-shop-item-dialog.component';

@Component({
  selector: 'app-shop-items-panel',
  templateUrl: './shop-items-panel.component.html',
  styleUrls: ['./shop-items-panel.component.css']
})
export class ShopItemsPanelComponent implements OnInit {




  items = new MatTableDataSource<ShopItem>();


  displayedColumns: string[] = ['id', 'name', 'type', 'price', 'gender', 'size', 'manufacturer', 'productionDate', 'rating', 'userReviews'];
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator


  constructor(public shopService: ShopService, private dialog: MatDialog) { }


  onRowClick(item: ShopItem) {
    this.openEditItem(item.id);
  }

  openEditItem(itemId: number) {
    const profileDialog = this.dialog.open(EditShopItemDialogComponent, {
      disableClose: false,
      width: "40vw",
      data: { item: this.shopService.getItemByID(itemId) }
    });

    profileDialog.afterClosed().subscribe(result => {

    })

  }



  addItem() {
    this.openAddItemDialog();
  }

  openAddItemDialog() {
    const addUserDialog = this.dialog.open(AddShopItemDialogComponent, {
      disableClose: false,
      width: "40vw",
    });

    addUserDialog.afterClosed().subscribe(result => {

    })

  }


  openUserReviewsDialog(item: ShopItem) {
    const dialogRef = this.dialog.open(ReviewsComponent, {
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }


  ngOnInit() {
    this.shopService.getShopItems().subscribe((items) => {
      this.items.data = items;
    });
  }

  ngAfterViewInit(): void {
    this.items.sort = this.sort;
    this.items.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.items.filter = filterValue.trim().toLowerCase();
  }


}
