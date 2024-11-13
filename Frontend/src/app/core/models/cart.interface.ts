export interface Cart {
    id:                    number;
    orderDate:             Date;
    status:                string;
    estimatedDeliveryDate: Date;
    orderProducts:         OrderProduct[];
}

export interface OrderProduct {
    id:          number;
    orderId:     number;
    productId:   number;
    quantity:    number;
    productName: string;
    price:       number;
}
