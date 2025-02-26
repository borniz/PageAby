import { CurrencyPipe, isPlatformBrowser, NgFor } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { IShopping } from '../../model/shopping';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CurrencyPipe, NgFor],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
  public apiservices: IShopping[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const storedItems = localStorage.getItem('cart');
      this.apiservices = storedItems ? JSON.parse(storedItems) : [];
      console.log("Los datos que hay en storage son:", this.apiservices);
    }
  }

  deleteItemCart(itemid: number) {
    this.apiservices = this.apiservices.filter((item) => item.id !== itemid);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.apiservices));
    }
  }

  getTotal() {
    return this.apiservices.reduce((total, item) => total + item.quantity * item.base_price, 0);
  }
}
