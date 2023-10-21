import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { OrderStatus } from 'src/app/enums';
import { Order } from '../order.model';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent {
  orders: Order[] = [];

  displayedColumns: string[] = ['name', 'amount', 'status', 'remove'];


  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders.filter(order => order.status === OrderStatus.Delivered || order.status === OrderStatus.Canceled);
    });
  }




  removeFromCart(order: Order) {
    this.cartService.removeOrder(order);
    this.orders = this.orders.filter((o: Order) => o.id !== order.id);
  }

}
