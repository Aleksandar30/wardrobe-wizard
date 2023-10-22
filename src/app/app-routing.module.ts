import { RouterModule, Routes } from "@angular/router";
import { ShopComponent } from "./shop/shop.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { CartComponent } from "./cart/cart.component";
import { NgModule } from "@angular/core";
import { ProfileComponent } from "./auth/profile/profile.component";
import { AdminPanelComponent } from "./auth/admin-panel/admin-panel.component";



const routes: Routes = [
    { path: '', component: ShopComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'cart', component: CartComponent },
    { path: 'admin-panel', component: AdminPanelComponent },
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

