import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { map, Observable } from 'rxjs';
import { ResultProductsAPI } from '../models/product.api.interface';
import { ProductListResponse } from '../models/ProductListResponse.interface';

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



  getCategories(): Observable<string[]> {
    const url = `${this.url}/api/v1/Product/GetCategories`;
    return this.http.get<string[]>(url);
  }
}
