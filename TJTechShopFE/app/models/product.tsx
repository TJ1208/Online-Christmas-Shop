import { BrandModel } from "./brand";
import { ImageModel } from "./image";
import SubCategoryModel from "./sub-category";

export interface ProductModel {
    product_id?: number;
    description: string;
    name: string;
    price: number;
    sale_price: number;
    images?: ImageModel[];
    create_time?: string;
    category_id: number;
    brand_id: number;
    brand?: BrandModel;
    sub_category?: SubCategoryModel;
}