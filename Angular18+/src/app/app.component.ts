import { Component, effect, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ProductsComponent } from './page/products/products.component';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterModule,
    HomeComponent,
    ProductsComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ABY-Page';
  navbarSearch = false;

  shopping = false;

  constructor(private cartService: CartService) {
    effect(() => {
      this.shopping = this.cartService.shoppingCartActive();
    });
  }

  ngOnInit(): void {}
}

// Método para actualizar el estado del carrito.
