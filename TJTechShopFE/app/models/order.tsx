import { ProductModel } from "./product";
import { UserModel } from "./user";

export interface OrderModel {
    order_id: number;
    user_id: number;
    create_time: string;
    products?: ProductModel[];
    user?: UserModel;
}