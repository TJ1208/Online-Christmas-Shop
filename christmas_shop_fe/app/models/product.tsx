import { ImageModel } from "./image";

export interface ProductModel {
    product_id: number;
    description: string;
    name: string;
    price: number;
    sale_price: number;
    images: ImageModel[];
}