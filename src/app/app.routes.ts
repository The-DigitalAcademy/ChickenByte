import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'promotions', component: PromotionsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
     { path: 'products/:id', component: ProductDetailsComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
