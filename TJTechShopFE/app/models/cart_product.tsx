import { CartModel } from "./cart";
import { ProductModel } from "./product";

export interface CartProductModel {
    cart_id: number;
    product_id: number;
    quantity: number;
    cart?: CartModel;
    product?: ProductModel;
}