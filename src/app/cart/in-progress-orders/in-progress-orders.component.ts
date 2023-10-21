import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { OrderStatus } from 'src/app/enums';
import { Order } from '../order.model';
import { UserService } from 'src/app/auth/users.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-in-progress-orders',
  templateUrl: './in-progress-orders.component.html',
  styleUrls: ['./in-progress-orders.component.css']
})
export class InProgressOrdersComponent implements OnInit {

  orders: Order[] = [];

  displayedColumns: string[] = ['name', 'amount', 'price', 'status'];


  constructor(private cartService: CartService, private userService: UserService, private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders: Order[]) => {
      const currentUser = this.userService.currentUser;
      if (currentUser) {
        this.orders = orders.filter((o: Order) => o.userId === currentUser.id && o.status === OrderStatus.InProgress);

      }
    });
  }

  updateOrderStatus(order: Order) {
    order.status = this.mapStatusToEnum(order.status);
    this.orderService.changeOrderStatus(order, order.status);

    console.log(order.status);

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






}
