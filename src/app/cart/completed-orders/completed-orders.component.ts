import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../cart.service';
import { OrderStatus } from 'src/app/enums';
import { Order } from '../order.model';
import { OrderService } from '../order.service';
import { UserService } from 'src/app/auth/users.service';
import { User } from 'src/app/auth/user.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent implements AfterViewInit, OnInit {

  orders = new MatTableDataSource<Order>();

  displayedColumns: string[] = ['shopItem', 'amount', 'status', 'remove'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders: Order[]) => {
      const currentUser = this.userService.currentUser;
      if (currentUser) {
        this.orders.data = orders.filter((o: Order) => o.userId === currentUser.id && o.status !== OrderStatus.InProgress);
        //this.orders.data = orders;

      }
    });
  }


  ngAfterViewInit(): void {
    this.orders.sort = this.sort;
    this.orders.paginator = this.paginator;
  }




  removeFromCart(order: Order) {
    this.orderService.removeOrder(order);
  }


}
