import { OrderModel } from "./order";
import { ProductModel } from "./product";

export interface OrderProductModel {
    order_id: number;
    product_id: number;
    quantity: number;
    order: OrderModel;
    product: ProductModel;
}