import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ShopItem } from '../shop/shop-item.model';
import { OrderStatus } from '../enums';
import { Order } from './order.model';




@Injectable({
    providedIn: 'root'
})
export class CartService {


    private cartItems = new Map<ShopItem, number>();
    private cartItemsSubject = new BehaviorSubject<Map<ShopItem, number>>(this.cartItems);

    private orders: Order[] = [];
    private ordersSubject = new BehaviorSubject<Order[]>(this.orders);

    private cartItemsPrice = 0;

    constructor() { }

    getOrders() {
        return this.ordersSubject.asObservable();
    }


    changeOrderStatus(order: Order, status: OrderStatus) {
        const index = this.orders.indexOf(order);
        if (index > -1) {
            this.orders[index].status = status;
            this.ordersSubject.next(this.orders);
        }

    }

    addToCart(item: ShopItem, amount: number = 1) {

        // this.orders.push({
        //     id: this.orders.length + 1,
        //     shopItem: item,
        //     status: OrderStatus.InProgress,
        //     amount: amount
        // });
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
            this.cartItemsSubject.next(this.cartItems);

        }
    }

    removeOrder(order: Order) {
        const index = this.orders.indexOf(order);
        if (index > -1) {
            this.orders.splice(index, 1);
            this.ordersSubject.next(this.orders);
        }

    }

    checkout() {
        this.orders = [];
        for (const item of this.cartItems.keys()) {
            this.orders.push({
                id: this.orders.length + 1,
                shopItem: item,
                price: item.price * (this.cartItems.get(item) || 0),
                status: OrderStatus.InProgress,
                amount: this.cartItems.get(item) || 0
            });
        }


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