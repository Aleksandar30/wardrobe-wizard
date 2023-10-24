import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ShopItem } from '../shop/shop-item.model';
import { OrderStatus } from '../enums';
import { Order } from './order.model';
import { UserService } from '../auth/users.service';
import { ShopService } from '../shop/shop.service';
import { OrderService } from './order.service';



@Injectable({
    providedIn: 'root'
})
export class CartService {



    private cartItems = new Map<ShopItem, number>();
    private cartItemsSubject = new BehaviorSubject<Map<ShopItem, number>>(this.cartItems);

    private orders: Order[] = [];
    private ordersSubject = new BehaviorSubject<Order[]>(this.orders);

    private cartItemsPrice = 0;

    constructor(private userService: UserService, private orderService: OrderService) { }

    getOrders() {
        this.ordersSubject.next(this.orders);
        return this.ordersSubject.asObservable();
    }

    addToCart(item: ShopItem, amount: number = 1) {
        if (this.cartItems.has(item)) {
            const currentAmount = this.cartItems.get(item);
            if (typeof currentAmount !== 'undefined') {
                this.cartItems.set(item, amount);
            }
        } else {
            this.cartItems.set(item, amount);
        }
        this.cartItemsPrice += item.price * amount;
        this.cartItemsSubject.next(this.cartItems);
    }

    removeFromCart(item: ShopItem) {
        if (this.cartItems.has(item)) {
            const amount = this.cartItems.get(item);
            if (typeof amount !== 'undefined') {
                this.cartItemsPrice -= item.price * amount;
            }
            this.cartItems.delete(item);
            this.cartItemsPrice = 0;
            this.cartItemsSubject.next(this.cartItems);

        }
    }

    editCartItem(item: ShopItem, newAmount: number) {
        if (this.cartItems.has(item)) {
            const oldAmount = this.cartItems.get(item);
            if (typeof oldAmount !== 'undefined') {
                if (newAmount < oldAmount) {
                    this.cartItemsPrice -= item.price * (oldAmount - newAmount);
                } else {
                    this.cartItemsPrice += item.price * (newAmount - oldAmount);
                }
            }

            this.cartItems.set(item, newAmount);
            this.cartItemsSubject.next(this.cartItems);
        }
    }


    checkout() {
        var newOrders: Order[] = [];
        for (const item of this.cartItems.keys()) {
            newOrders.push({
                id: this.orders.length + 1,
                userId: this.userService.currentUser?.id,
                shopItem: item,
                price: item.price * (this.cartItems.get(item) || 0),
                status: OrderStatus.InProgress,
                amount: this.cartItems.get(item) || 0
            });
        }
        this.orderService.addOrders(newOrders);


        this.cartItems.clear();
        this.cartItemsPrice = 0;
        this.cartItemsSubject.next(this.cartItems);
        this.ordersSubject.next(this.orders);
    }

    getCartItems() {
        return this.cartItemsSubject.asObservable();
    }

    getCartItemsPrice() {
        return this.cartItemsPrice;
    }
}