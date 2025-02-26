import { Injectable, signal, computed, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = signal<number[]>([]);

  shoppingCartActive: WritableSignal<boolean> = signal(false);

  setCartActive(isActive: boolean) {
    this.shoppingCartActive.set(isActive);
  }
  addProductToCart(productId: number) {
    const updatedCart = [...this.cartItems(), productId];
    this.cartItems.set(updatedCart);
  }

  getCartItems() {
    return this.cartItems();
  }
}
