import { Component } from '@angular/core';
import { ShopItem } from 'src/app/shop/shop-item.model';
import { CartService } from '../cart.service';
import { UserService } from 'src/app/auth/users.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartItems = new Map<ShopItem, number>();
  itemsPrice = 0;

  displayedColumns = ['name', 'type', 'gender', 'manufacturer', 'size', 'production_date', 'price', 'rating', 'amount', 'remove'];

  constructor(private cartService: CartService, private userService: UserService) { }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.itemsPrice = this.cartService.getCartItemsPrice();
    });

  }

  removeFromCart(item: ShopItem) {
    this.cartService.removeFromCart(item);
  }

  getTotalPrice(items: Map<ShopItem, number>): number {
    let total = 0;
    total = this.cartService.getCartItemsPrice();
    return total;
  }

  checkout() {
    const items = Array.from(this.cartItems.keys());
    this.cartService.checkout();
  }


}
