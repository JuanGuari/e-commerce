import { Injectable } from '@angular/core';
import { ProductApi } from '../models/product.api.interface';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  mapToProductModel(apiModel: ProductApi): Product {
    return {
      id:            apiModel.id,
      name:          apiModel.name,
      description:   apiModel.description,
      category:      apiModel.category,
      price:         apiModel.price,
      imageUrl:      apiModel.imageUrl,
      orderProducts: null
    };
  }

  mapToProductApiModel(model: Product): ProductApi {
    return {
      id:            model.id,
      name:          model.name,
      description:   model.description,
      category:      model.category,
      price:         model.price,
      imageUrl:      model.imageUrl,
      orderProducts: null
    };
  }


}
