import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { map, Observable } from 'rxjs';
import { ResultProductsAPI } from '../models/productResponse.interface';
import { Product } from '../models/product.interface';
import { ProductListResponse } from '../models/productListResponse.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductApiService extends BaseService {

  getAll(category = '', page = 1, pageSize = 9, searchTerm = ''): Observable<ProductListResponse> {
    const url = `${this.url}/api/v1/Product/GetAll?category=${category || ''}
    &pageNumber=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`;

    return this.http.get<ResultProductsAPI>(url).pipe(
      map((result) => ({
        totalItems: result.totalItems,
        pageNumber: result.pageNumber,
        pageSize: result.pageSize,
        products: result.products.map((apiProduct) => this._mapper.mapToProductModel(apiProduct))
      }))
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/api/v1/Product/GetById?id=${id}`).pipe(
      map(response => this._mapper.mapToProductModel(response))
    );
  }

  getCategories(): Observable<string[]> {
    const url = `${this.url}/api/v1/Product/GetCategories`;
    return this.http.get<string[]>(url);
  }
}
