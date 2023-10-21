import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { OrderStatus } from 'src/app/enums';
import { Order } from '../order.model';
import { UserService } from 'src/app/auth/users.service';

@Component({
  selector: 'app-in-progress-orders',
  templateUrl: './in-progress-orders.component.html',
  styleUrls: ['./in-progress-orders.component.css']
})
export class InProgressOrdersComponent implements OnInit {

  orders: Order[] = [];

  displayedColumns: string[] = ['name', 'amount', 'price', 'status'];


  constructor(private cartService: CartService, private userService: UserService) { }

  ngOnInit() {
    this.cartService.getOrders().subscribe((orders: Order[]) => {
      console.log(orders);
      this.orders = orders;
      for (let order of this.orders) {
        if (order.status === OrderStatus.Delivered || order.status === OrderStatus.Canceled || order.userId !== this.userService.currentUser!.id) {
          this.orders = this.orders.filter((o: Order) => o.id !== order.id);
        }
      }
      console.log(orders);
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
