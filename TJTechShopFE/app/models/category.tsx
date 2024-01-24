import { ImageModel } from "./image";
import SubCategoryModel from "./sub-category";

export interface CategoryModel {
    category_id?: number;
    name: string;
    image?: ImageModel;
    image_id: number;
    sub_categories?: SubCategoryModel[];
}

export default CategoryModel;