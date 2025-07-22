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

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const storedItems = localStorage.getItem('cart');
      const parsedItems: IShopping[] = storedItems ? JSON.parse(storedItems) : [];

      // Consolidar productos repetidos por ID
      this.apiservices = this.mergeDuplicates(parsedItems);

      // Guardar el carrito limpio
      localStorage.setItem('cart', JSON.stringify(this.apiservices));
    }
  }

  /**
   * Combina productos repetidos por ID y suma sus quantities
   */
  private mergeDuplicates(items: IShopping[]): IShopping[] {
    const itemMap = new Map<string, IShopping>();

    for (const item of items) {
      const key = String(item.id);
      const existing = itemMap.get(key);

      if (existing) {
        existing.quantity = (existing.quantity || 0) + (item.quantity || 0);
      } else {
        itemMap.set(key, { ...item });
      }
    }

    return Array.from(itemMap.values());
  }

  /**
   * Agrega un producto al carrito. Si ya existe, le suma la cantidad.
   */
  addToCart(product: IShopping) {
    const index = this.apiservices.findIndex(item => item.id === product.id);

    if (index !== -1) {
      this.apiservices[index].quantity += product.quantity;
    } else {
      this.apiservices.push({ ...product });
    }

    // Guardar en localStorage
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.apiservices));
    }
  }

  /**
   * Elimina un ítem por ID
   */
  deleteItemCart(itemId: number | string) {
    this.apiservices = this.apiservices.filter(item => item.id !== itemId);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.apiservices));
    }
  }

  /**
   * Calcula el total del carrito
   */
  getTotal(): number {
    return this.apiservices.reduce(
      (total, item) => total + item.quantity * item.base_price,
      0
    );
  }
}
