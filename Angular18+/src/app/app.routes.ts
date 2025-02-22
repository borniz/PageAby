import { Routes } from '@angular/router';
import { ContactComponent } from './page/contact/contact.component';
import { HomeComponent } from './page/home/home.component';
import { NewProductComponent } from './page/products/new-product/new-product.component';
import { ProductsComponent } from './page/products/products.component';
import { ShoppingCartComponent } from './page/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'newproduct', component: NewProductComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
