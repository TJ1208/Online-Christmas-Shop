import { ImageModel } from "./image";

export interface CategoryModel {
    category_id?: number;
    name: string;
    image?: ImageModel;
    image_id: number;
}

export default CategoryModel;