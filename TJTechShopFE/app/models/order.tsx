import { AddressModel } from "./address";
import { ProductModel } from "./product";
import { ShippingMethodModel } from "./shipping-method";
import { UserModel } from "./user";

export interface OrderModel {
    order_id?: number;
    user_id: number;
    address_id: number;
    shipping_id: number;
    total: number;
    create_time: string;
    products?: ProductModel[];
    user?: UserModel;
    address?: AddressModel;
    shipping_method?: ShippingMethodModel;
}