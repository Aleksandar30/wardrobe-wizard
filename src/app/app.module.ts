import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { RoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { ProfileComponent } from './auth/profile/profile.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { InProgressOrdersComponent } from './cart/in-progress-orders/in-progress-orders.component';
import { ShopService } from './shop/shop.service';
import { FormsModule } from '@angular/forms';
import { UserService } from './auth/users.service';
import { CartService } from './cart/cart.service';
import { CartDialogComponent } from './cart/cart-dialog/cart-dialog.component';
import { CompletedOrdersComponent } from './cart/completed-orders/completed-orders.component';
import { ConfirmDialogComponent } from './auth/profile/confirm-dialog/confirm-dialog.component';
import { ReviewsComponent } from './shop/reviews/reviews.component';
import { OrderService } from './cart/order.service';
import { AdminPanelComponent } from './auth/admin-panel/admin-panel.component';
import { UsersPanelComponent } from './auth/admin-panel/users-panel/users-panel.component';
import { ShopItemsPanelComponent } from './auth/admin-panel/shop-items-panel/shop-items-panel.component';
import { OrdersPanelComponent } from './auth/admin-panel/orders-panel/orders-panel.component';
import { AddUserDialogComponent } from './auth/admin-panel/users-panel/add-user-dialog/add-user-dialog.component';
import { AddShopItemDialogComponent } from './auth/admin-panel/shop-items-panel/add-shop-item-dialog/add-shop-item-dialog.component';
import { EditShopItemDialogComponent } from './auth/admin-panel/shop-items-panel/edit-shop-item-dialog/edit-shop-item-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    CartComponent,
    ProfileComponent,
    CheckoutComponent,
    InProgressOrdersComponent,
    CartComponent,
    CartDialogComponent,
    CompletedOrdersComponent,
    ConfirmDialogComponent,
    ReviewsComponent,
    AdminPanelComponent,
    UsersPanelComponent,
    ShopItemsPanelComponent,
    OrdersPanelComponent,
    AddUserDialogComponent,
    AddShopItemDialogComponent,
    EditShopItemDialogComponent

  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RoutingModule,
    FormsModule,
    FlexLayoutModule,
  ],
  providers: [ShopService, UserService, CartService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
