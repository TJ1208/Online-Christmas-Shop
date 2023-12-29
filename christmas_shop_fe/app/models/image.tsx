import { ProductModel } from "./product";

export interface ImageModel {
    image_id?: number;
    url: string;
    create_time: string;
    products?: ProductModel[];
}