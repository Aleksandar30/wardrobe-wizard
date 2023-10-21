import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { OrderStatus } from 'src/app/enums';
import { Order } from '../order.model';
import { OrderService } from '../order.service';
import { UserService } from 'src/app/auth/users.service';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent {
  orders: Order[] = [];

  displayedColumns: string[] = ['name', 'amount', 'status', 'remove'];


  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders: Order[]) => {
      const currentUser = this.userService.currentUser;
      if (currentUser) {
        this.orders = orders.filter((o: Order) => o.userId === currentUser.id && o.status !== OrderStatus.InProgress);

      }
    });
  }




  removeFromCart(order: Order) {
    this.orderService.removeOrder(order);
  }

}
