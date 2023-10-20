import { Component, OnInit } from '@angular/core';
import { CartService, Order } from '../cart.service';
import { OrderStatus } from 'src/app/enums';

@Component({
  selector: 'app-in-progress-orders',
  templateUrl: './in-progress-orders.component.html',
  styleUrls: ['./in-progress-orders.component.css']
})
export class InProgressOrdersComponent implements OnInit {

  orders: Order[] = [];

  displayedColumns: string[] = ['name', 'amount', 'price', 'status'];


  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }

  updateOrderStatus(order: Order) {
    order.status = this.mapStatusToEnum(order.status);
    this.cartService.changeOrderStatus(order, order.status);

    if (order.status === OrderStatus.Delivered || order.status === OrderStatus.Canceled) {
      this.orders = this.orders.filter((o: Order) => o.id !== order.id);
    }
  }

  private mapStatusToEnum(status: string): OrderStatus {
    switch (status) {
      case 'Canceled':
        return OrderStatus.Canceled;
      case 'Shipped':
        return OrderStatus.InProgress;
      case 'Delivered':
        return OrderStatus.Delivered;
      default:
        throw new Error(`Invalid status: ${status}`);
    }
  }




  removeFromCart(order: Order) {
    this.cartService.removeOrder(order);
    this.orders = this.orders.filter((o: Order) => o.id !== order.id);
  }

}
