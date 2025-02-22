import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
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
  storedItems = localStorage.getItem('cart');
  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedItems = localStorage.getItem('cart');
      if (storedItems) {
        this.apiservices = JSON.parse(storedItems);
        console.log("los datos que hay en storage son ", this.apiservices);

      }
    }
  }

  constructor() {

  }
  deleteItemCart(itemid: number) {
    this.apiservices = this.apiservices.filter((item) => item.id !== itemid);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cart', JSON.stringify(this.apiservices));
    }

  }

  getTotal() {
    let total = 0;
    this.apiservices.forEach((item) => {
      total += item.quantity * item.base_price;
    });
    return total;
  }
}
