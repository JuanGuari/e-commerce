export interface ResultProductsAPI {
    totalItems: number;
    pageNumber: number;
    pageSize:   number;
    products:   ProductApi[];
}

export interface ProductApi {
    id:            number;
    name:          string;
    description:   string;
    category:      string;
    price:         number;
    imageUrl:      string;
    orderProducts: null;
}
