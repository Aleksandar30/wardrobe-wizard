import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../user.model';
import { Order } from 'src/app/cart/order.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OrderService } from 'src/app/cart/order.service';
import { OrderStatus } from 'src/app/enums';

@Component({
  selector: 'app-orders-panel',
  templateUrl: './orders-panel.component.html',
  styleUrls: ['./orders-panel.component.css']
})
export class OrdersPanelComponent {


  doFilter(filterValue: string) {
    this.orders.filterPredicate = (order: Order, filter: string) => {
      return order.userId!.toString().includes(filter.trim());
    };
    this.orders.filter = filterValue.trim().toLowerCase();
  }


  orders = new MatTableDataSource<Order>();

  displayedColumns: string[] = ['id', 'userId', 'shopItem', 'amount', 'price', 'status'];

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator


  constructor(public orderService: OrderService) { }

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


  ngOnInit() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders.data = orders;
    });
  }

  ngAfterViewInit(): void {
    this.orders.sort = this.sort;
    this.orders.paginator = this.paginator;
  }


}
