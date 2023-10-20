import { RouterModule, Routes } from "@angular/router";
import { ShopComponent } from "./shop/shop.component";
import { WellcomeComponent } from "./wellcome/wellcome.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { CartComponent } from "./cart/cart.component";
import { NgModule } from "@angular/core";
import { ProfileComponent } from "./auth/profile/profile.component";



const routes: Routes = [
    //{ path: '', component: WellcomeComponent },
    { path: '', component: ShopComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'cart', component: CartComponent },
    { path: 'profile', component: ProfileComponent }
];


@NgModule
    ({
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ],
    })
export class RoutingModule { }

