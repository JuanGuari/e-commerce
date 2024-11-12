import { Product } from "./product.interface";

export interface ProductListResponse {
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    products: Product[];
}
