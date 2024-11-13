import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../core/models/product.interface';
import { OrderProduct } from '../../core/models/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsSubject = new BehaviorSubject<OrderProduct[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  setItemsInCart(OrderProduct: OrderProduct[]){
    this.cartItemsSubject.next(OrderProduct);
  }

  getCartItems(): Observable<OrderProduct[]> {
    return this.cartItems$;
  }

  addToCart(product: OrderProduct): void {
    const currentItems = this.cartItemsSubject.getValue();
    this.cartItemsSubject.next([...currentItems, product]);
  }

  removeFromCart(productId: string): void {
    const updatedItems = this.cartItemsSubject
      .getValue()
      .filter(item => item.id !== +productId);
    this.cartItemsSubject.next(updatedItems);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}