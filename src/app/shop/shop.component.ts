import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { ShopItem } from './shop-item.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClothingSize, ClothingType } from '../enums';
import { filter } from 'rxjs';
import { UserService } from '../auth/users.service';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from '../cart/cart-dialog/cart-dialog.component';
import { CartService } from '../cart/cart.service';
import { ReviewsComponent } from './reviews/reviews.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  shopItemsSource = new MatTableDataSource<ShopItem>();
  showFilters = false;

  zIndexValue = 0;

  displayedColumns = ['name', 'type', 'gender', 'size', 'manufacturer', 'productionDate', 'price', 'rating', 'shoppingCart'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private shopService: ShopService,
    private userService: UserService,
    private dialog: MatDialog,
    private cartService: CartService,) { }

  cartItems = new Map<ShopItem, number>();


  openUserReviewsDialog(item: ShopItem) {
    var userLoggedIn = this.userService.checkIfUserLoggedIn();
    const dialogRef = this.dialog.open(ReviewsComponent, {
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }


  addToCart(item: ShopItem, amount: number) {
    this.cartItems.set(item, amount);
    this.cartService.addToCart(item, amount);
  }

  removeFromCart(item: ShopItem) {
    this.cartService.removeFromCart(item);
    this.cartItems.delete(item);
    console.log(this.cartItems);
  }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
    this.shopItemsSource.data = this.shopService.getShopItemsC();
    this.manufacturers = this.shopItemsSource.data.map(item => item.manufacturer).filter((value, index, self) => self.indexOf(value) === index);

  }

  ngAfterViewInit(): void {
    this.shopItemsSource.sort = this.sort;
    this.shopItemsSource.paginator = this.paginator;
  }

  openAddToCartDialog(item: ShopItem) {

    var userLoggedIn = this.userService.checkIfUserLoggedIn();

    if (!userLoggedIn) {
      alert("You need to be logged in to add items to your cart");
      return;
    }
    var isEditing = false;

    if (this.cartItems.has(item)) {
      isEditing = true;
    }




    const dialogRef = this.dialog.open(CartDialogComponent, {
      data: { item: item, isEditing: isEditing }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.amount === 0) {
          this.removeFromCart(item);
          return;
        }
        this.addToCart(item, result.amount);
      }
    });
  }



  types = Object.values(ClothingType);
  sizes = Object.values(ClothingSize);
  manufacturers?: string[];

  titleFilterValue: string = "";
  typeFilterValue: string = "";
  sizeFilterValue: string = "";
  manufacturersFilterValue: string = "";
  dateFilterValue: Date | null = null;

  priceFilterMinValue: number | null = null;
  priceFilterMaxValue: number | null = null;

  buyerScoreFilterMinValue: number | null = null;
  buyerScoreFilterMaxValue: number | null = null;

  doFilter(filterValue: string) {
    this.titleFilterValue = filterValue;

    this.applyFilters();
  }





  applyFilters() {
    this.shopItemsSource.filterPredicate = (item: ShopItem, filter: string) => {
      const filters = filter.split(',');
      const titleFilter = filters[0];
      const typeFilter = filters[1];
      const sizeFilter = filters[2];
      const manufacturerFilter = filters[3];
      const dateFilter = filters[4];
      const priceFilterMin = filters[5];
      const priceFilterMax = filters[6];
      const buyerScoreFilterMin = filters[7];
      const buyerScoreFilterMax = filters[8];

      let match = true;

      if (titleFilter) {
        match = match && item.name.toLowerCase().indexOf(titleFilter.toLowerCase()) !== -1;
      }

      if (typeFilter) {
        match = match && item.type === typeFilter;
      }

      if (sizeFilter) {
        match = match && item.size === sizeFilter;
      }

      if (manufacturerFilter) {
        match = match && item.manufacturer === manufacturerFilter;
      }

      if (dateFilter && item.productionDate.getFullYear() !== new Date(dateFilter).getFullYear()) {
        match = false;
      }

      if (priceFilterMin && priceFilterMax) {
        const minPrice = parseInt(priceFilterMin, 10);
        const maxPrice = parseInt(priceFilterMax, 10);
        if (item.price < minPrice || item.price > maxPrice) {
          match = false;
        }
      } else if (priceFilterMin) {
        if (item.price < parseInt(priceFilterMin, 10)) {
          match = false;
        }
      } else if (priceFilterMax) {
        if (item.price > parseInt(priceFilterMax, 10)) {
          match = false;
        }
      }

      if (buyerScoreFilterMin && buyerScoreFilterMax) {
        const minBuyerScore = parseInt(buyerScoreFilterMin, 10);
        const maxBuyerScore = parseInt(buyerScoreFilterMax, 10);
        if (item.rating < minBuyerScore || item.rating > maxBuyerScore) {
          match = false;
        }
      } else if (buyerScoreFilterMin) {
        if (item.rating < parseInt(buyerScoreFilterMin, 10)) {
          match = false;
        }
      } else if (buyerScoreFilterMax) {
        if (item.rating > parseInt(buyerScoreFilterMax, 10)) {
          match = false;
        }
      }

      this.zIndexValue = 0;
      return match;
    };

    const filters = [];
    filters.push(this.titleFilterValue);
    filters.push(this.typeFilterValue);
    filters.push(this.sizeFilterValue);
    filters.push(this.manufacturersFilterValue);
    filters.push(this.dateFilterValue);
    filters.push(this.priceFilterMinValue);
    filters.push(this.priceFilterMaxValue);
    filters.push(this.buyerScoreFilterMinValue);
    filters.push(this.buyerScoreFilterMaxValue);

    this.shopItemsSource.filter = filters.join(',');
  }

  clearFilters() {
    this.titleFilterValue = "";
    this.typeFilterValue = "";
    this.sizeFilterValue = "";
    this.manufacturersFilterValue = "";
    this.dateFilterValue = null;
    this.priceFilterMinValue = null;
    this.priceFilterMaxValue = null;
    this.buyerScoreFilterMinValue = null;
    this.buyerScoreFilterMaxValue = null;

    this.applyFilters();
  }
}
