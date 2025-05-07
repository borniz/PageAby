import { Routes } from '@angular/router';
import { ContactComponent } from './page/contact/contact.component';
import { HomeComponent } from './page/home/home.component';
import { NewProductComponent } from './page/products/new-product/new-product.component';
import { ProductsComponent } from './page/products/products.component';
import { ShoppingCartComponent } from './page/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products',
    loadComponent: () =>
      import('./page/products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./page/contact/contact.component').then(
        (c) => c.ContactComponent
      ),
  },
  {
    path: 'newproduct',
    loadComponent: () =>
      import('./page/products/new-product/new-product.component').then(
        (c) => c.NewProductComponent
      ),
  },
  {
    path: 'shoppingCart',
    loadComponent: () =>
      import('./page//shopping-cart/shopping-cart.component').then(
        (c) => c.ShoppingCartComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page/products/products.component').then(
        (c) => c.ProductsComponent
      ),
    redirectTo: '',
    pathMatch: 'full',
  },
];
