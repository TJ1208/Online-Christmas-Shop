import CategoryModel from "./category";

export interface SubCategoryModel {
    id?: number;
    category_id: number;
    name: string;
    category?: CategoryModel;
}

export default SubCategoryModel;