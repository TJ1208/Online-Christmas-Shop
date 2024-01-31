import { ProductModel } from "./product";

export interface CartModel {
    cart_id?: number;
    user_id: number;
    products?: ProductModel[];
}