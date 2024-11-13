import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService extends BaseService{

  getOrderByUser(id: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.url}/api/v1/Cart/GetCart?userId=${id}`)
    // .pipe(
    //   map(response => this._mapper.mapToProductModel(response))
    // );
  }

  addProductToCart(userId: string, productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.url}/api/v1/Cart/AddToCart?userId=${userId}&productId=${productId}&quantity=${quantity}`, {});
  }

  CheckoutCart(userId: string): Observable<any> {
    return this.http.post<any>(`${this.url}/api/v1/Cart/Checkout?userId=${userId}`, {});
  }

}
