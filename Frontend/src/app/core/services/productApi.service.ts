import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { map, Observable } from 'rxjs';
import { ProductApi, ResultProductsAPI } from '../models/product.api.interface';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService extends BaseService {

  getAll(category: string | null = null, page: number = 1, pageSize: number = 9): Observable<Product[]> {
    const url = `${this.url}/api/v1/Product/GetAll?category=${category || ''}&pageNumber=${page}&pageSize=${pageSize}`;
  
    return this.http.get<ResultProductsAPI>(url)
      .pipe(
        map((result) => result.products.map((apiProduct) => this._mapper.mapToProductModel(apiProduct)))
      );
  }


  getCategories(): Observable<string[]> {
    const url = `${this.url}/api/v1/Product/GetCategories`;  
    return this.http.get<string[]>(url);
  }
}
