import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ShopComponent } from './shop/shop.component';
import { WellcomeComponent } from './wellcome/wellcome.component';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    WellcomeComponent,
    CartComponent,
    ProfileComponent,
    CheckoutComponent,
    InProgressOrdersComponent,
    CartComponent,
    CartDialogComponent,
    CompletedOrdersComponent,
    ConfirmDialogComponent,
    ReviewsComponent

  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RoutingModule,
    FormsModule,
    FlexLayoutModule,
  ],
  providers: [ShopService, UserService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
